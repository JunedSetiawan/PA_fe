'use client'
import { api, changeAttributeInput } from '@/utils/frontend';
import { DetailedHTMLProps, Dispatch, ReactNode, SelectHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'

export interface IInputSelectProps extends Omit<DetailedHTMLProps<
    SelectHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>, 'value' | 'defaultValue' | 'type' | 'label'> {
    label?: ReactNode,
    name: string,

    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,
    validations?: typeValidations,
    options?: Array<string | number | { label: ReactNode, value: any }>,
    path?: string,
    onSearch?: (value: string) => any,
    noSearch?: boolean,
    noUnset?: boolean
}
export default function Select({
    setter,
    getter,

    noUnset,
    noLabel,
    onSearch,
    validations,
    noSearch,
    options,
    path,

    label,
    placeholder,
    className,
    onFocus,
    name,
    id,

    ...props
}: IInputSelectProps) {
    const refInput = useRef(null);
    const [IsFocus, setIsFocus] = useState(false);
    const [Search, setSearch] = useState('');
    const [OptionSelected, setOptionSelected] = useState<any>();
    const [CurrentOptions, setCurrentOptions] = useState<Array<any>>()


    /**
     * Function Handler
     */
    const loadOptions = () => {
        if (path && !options) {
            // Handle overlap on fetching data
            const now = Date.now();
            (window as any).fetchStartTime = {
                ...((window as any).fetchStartTime ?? {}),
                [`option@${name}:${path}`]: now
            }

            // Fetching data
            api({ path, objParams: { search: Search, defaultValue: (OptionSelected?.value ?? OptionSelected) } }).then(async (response) => {
                if ((response.status == 200) && (now == (window as any)?.fetchStartTime?.[`option@${name}:${path}`])) {
                    const { options, labelKey, valueKey } = (await response.json()).data;
                    setCurrentOptions(options?.map((option: any) => ({
                        label: (option?.[labelKey] ?? option),
                        value: (option?.[valueKey] ?? option)
                    })));
                }
            })
        }
    }



    /**
     * Use Effect
     */
    useEffect(() => {
        if (options?.length) setCurrentOptions(options)
    }, [options])



    useEffect(() => loadOptions(), [path])



    useEffect(() => {
        let delaySearch = setTimeout(() => loadOptions(), 1000);
        return (() => clearTimeout(delaySearch));
    }, [Search])



    useEffect(() => {
        if (noUnset && !OptionSelected && CurrentOptions?.length) {
            setOptionSelected(CurrentOptions[0])
        }
    }, [CurrentOptions])




    useEffect(() => {
        if (![(OptionSelected?.value ?? OptionSelected), undefined].includes(getter?.values?.[name])) {
            setOptionSelected(getter?.values?.[name]);
        }
    }, [getter?.values?.[name]])



    useEffect(() => {
        if (
            ((OptionSelected?.value ?? OptionSelected) != getter?.values?.[name])
        ) {
            setter((prev: typeStateInput) => {
                const invalids = { ...(prev.invalids ?? {}) }
                const uncompleteds = prev?.uncompleteds?.filter((res) => (res != name)) ?? []
                if (validations?.required && !OptionSelected) {
                    invalids[name] = ['Field tidak boleh kosong!']
                } else {
                    delete invalids[name]
                }
                return {
                    ...prev,
                    invalids,
                    uncompleteds,
                    values: { ...prev?.values, [name]: (OptionSelected?.value ?? OptionSelected) }
                }
            })
        }

        if (refInput.current) changeAttributeInput(refInput.current, 'value', (OptionSelected?.value ?? OptionSelected))
    }, [OptionSelected])



    useEffect(() => {
        if ((validations?.required && !OptionSelected && !getter?.uncompleteds?.includes(name))) {
            setter((prev: typeStateInput) => ({
                ...prev,
                uncompleteds: [...(prev?.uncompleteds ?? []), name]
            }))
        }
    }, [validations])



    useEffect(() => () => {
        setter((prev: typeStateInput) => {
            let invalids = prev?.invalids ?? {}
            delete invalids[name]

            let values = prev?.values ?? {}
            delete values[name]

            return {
                ...(prev ?? {}),
                invalids,
                uncompleteds: (prev?.uncompleteds ?? []).filter((uncompleted) => uncompleted != name),
                values,
            }
        });
    }, []);



    return (
        <div className='relative'>
            <div className={`input-group ${getter?.invalids?.[name]?.length ? 'input-group-invalid' : ''} ${className}`}>
                {!noLabel && <label htmlFor={name ?? id}>{label ?? name}</label>}
                <div className="relative cursor-pointer">
                    <input
                        ref={refInput}
                        id={name ?? id}
                        name={name}
                        {...props}
                        type='hidden'
                    />
                    <div className="input-form flex items-center" onClick={() => setIsFocus(true)}>
                        {OptionSelected?.label ?? OptionSelected ?? (<div className='text-gray-500'>{placeholder}</div>)}
                    </div>
                    <i className='bi bi-chevron-down absolute right-[1rem] top-[calc(50%-9px)]' />
                </div>
                {Boolean(getter?.invalids?.[name]?.length) && (
                    <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
                )}
            </div>
            {IsFocus && (
                <div className="absolute inset-x-0 pt-2 z-10">
                    <div className="card">
                        <div className={noSearch ? 'opacity-0 h-0' : 'p-2'}>
                            <div className={`input-group`}>
                                <input
                                    autoFocus={true}
                                    className='focus:border-gray-300'
                                    onChange={(e) => {
                                        setSearch((e.target.value) ?? '')
                                        if (onSearch) onSearch(e.target.value ?? '')
                                    }}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            setIsFocus(false)
                                            setSearch('')
                                        }, 300)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="relative overflow-y-auto overflow-x-hidden max-h-[10rem]">
                            <div className='divide-y border-t [&>*]:h-10 [&>*]:flex [&>*]:items-center [&>*]:px-3 [&>*]:cursor-pointer'>
                                {!noUnset && (
                                    <div
                                        onClick={() => {
                                            setOptionSelected(undefined);
                                        }}
                                        className={`text-gray-500 text-sm hover:bg-sky-200/30`}
                                    >unset</div>
                                )}
                                {CurrentOptions?.map((option, indexOption) => {
                                    return (
                                        <div
                                            key={indexOption}
                                            className={`truncate hover:bg-sky-200/30 ${((option.value ?? option) == (OptionSelected?.value ?? OptionSelected)) ? 'bg-sky-200/30' : ''}`}
                                            onClick={() => {
                                                setOptionSelected(option);
                                            }}
                                        >{option.label ?? option}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
