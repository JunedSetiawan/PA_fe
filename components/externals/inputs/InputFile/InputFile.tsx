
import { FileArrowUp, DownloadSimple, PlusCircle } from 'phosphor-react'
import React, { ChangeEvent, DetailedHTMLProps, Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import CropImage from './CropImage';
import { changeAttributeInput } from '@/utils/frontend';

export interface typeInputFileProps extends Omit<
    DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'value' | 'defaultValue' | 'type' | 'label'> {
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,
    name: string,
    type?: "file" | "imageCrop",
    className?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    label?: ReactNode,
    aspectRatio?: number
}

export default function InputFile({
    setter,
    getter,
    noLabel,
    aspectRatio = 0,

    className,
    onChange,
    required,
    accept,
    label,
    type,
    name,
    id,

    ...props
}: typeInputFileProps) {
    const refInput = useRef<HTMLInputElement>(null);
    const [ShowModal, setShowModal] = useState(false);



    useEffect(() => {
        if (getter?.values?.[name] instanceof File) {
            let container = new DataTransfer();
            container.items.add(getter.values[name]);
            if (refInput.current) {
                refInput.current.files = container.files;
            }
        }
    }, [getter?.values?.[name]])

    useEffect(() => {
        if (required && refInput.current && !refInput.current.files?.length && !getter?.invalids?.[name]?.length) {
            setter((prev: typeStateInput) => ({
                ...(prev ?? {}),
                uncompleteds: [...((prev?.uncompleteds ?? []).filter((uncompleted) => (uncompleted != name))), name]
            }))
        }
    }, [refInput?.current])

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
    }, [])




    return (
        <>
            <div className={`input-group ${getter?.invalids?.[name]?.length ? 'input-group-invalid' : ''}`}>
                {!noLabel && (
                    <div
                        className='cursor-pointer'
                        onClick={() => (
                            (type == 'imageCrop') ? setShowModal(true) : refInput?.current?.click()
                        )}
                    >{label ?? name}</div>
                )}
                <div>
                    <input
                        ref={refInput}
                        type="file"
                        name={name}
                        id={id ?? name}
                        onChange={(e) => {
                            const blobFile = e.target.files?.[0]

                            setter((prev: typeStateInput) => {
                                const invalids: string[] = []
                                if (!blobFile && required) {
                                    invalids.push('Field tidak boleh kosong!')
                                }

                                if (accept && blobFile) {
                                    const rule = accept.replaceAll(' ', '').replaceAll(',', '|').replaceAll('/*', '[/*]')
                                    const extName = blobFile.name.split('.').pop() ?? ''
                                    if (!(new RegExp(rule).test(blobFile.type) || new RegExp(rule).test(`.${extName}`))) {
                                        invalids.push(`File harus bertipe ${accept}`)
                                    }
                                }

                                return {
                                    ...(prev ?? {}),
                                    values: { ...(prev?.values ?? {}), [name]: blobFile },
                                    invalids: { ...(prev?.invalids ?? {}), [name]: invalids },
                                    uncompleteds: (prev?.uncompleteds ?? []).filter((uncompleted) => (uncompleted != name))
                                }
                            })
                            if (onChange) onChange(e)
                        }}
                        style={{ display: 'none' }}
                        accept={accept}
                        required={required}
                        {...props}
                    />
                    {!(getter?.values?.[name]) ? (
                        <div
                            onClick={() => (
                                (type == 'imageCrop') ? setShowModal(true) : refInput?.current?.click()
                            )}
                            className={`input-form flex items-center gap-1 ${className}`}
                        >
                            <FileArrowUp className="text-xl" />
                            <div>Pilih file</div>
                        </div>
                    ) : (
                        <div className={`input-form flex items-center ${className}`}>
                            <div className='flex items-center gap-1'>
                                <a className="rounded-full hover:bg-blue-100 hover:text-blue-500 h-7 aspect-square flex items-center justify-center"
                                    target="_blank" rel="noreferrer"
                                    href={(getter?.values?.[name] instanceof File) ? URL.createObjectURL(getter?.values?.[name]) : getter?.values?.[name]}>
                                    <DownloadSimple />
                                </a>
                                <div className="truncate block max-w-[12rem]">
                                    {getter?.values?.[name]?.name ?? getter?.values?.[name]}
                                </div>
                            </div>
                            <div className={`ml-auto cursor-pointer`}
                                onClick={() => {
                                    if (refInput.current) {
                                        const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
                                        valueSetter?.call(refInput.current, null);
                                        const eventTrigger = new Event('change', { bubbles: true });
                                        refInput.current.dispatchEvent(eventTrigger);
                                    }
                                }}>
                                <div className='rotate-45 rounded-full hover:text-red-500'>
                                    <PlusCircle />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {Boolean(getter?.invalids?.[name]?.length) && (
                    <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
                )}
            </div>
            {(type == 'imageCrop') && (
                <CropImage
                    show={ShowModal}
                    onSelect={(fileCropped) => {
                        let container = new DataTransfer();
                        container.items.add(fileCropped);
                        changeAttributeInput(refInput.current, 'files', container.files)
                        setShowModal(false)
                    }}
                    onCancel={() => setShowModal(false)}
                    defaultValue={getter?.values?.[name]}
                    aspectRatio={aspectRatio}
                />
            )}
        </>
    )
}
