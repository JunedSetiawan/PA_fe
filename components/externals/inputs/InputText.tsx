'use client'

import React, { DetailedHTMLProps, Dispatch, FormEvent, InputHTMLAttributes, ReactNode, SetStateAction, useEffect } from 'react'
import validator from './validatorUtils'

export interface typeInputTextProps extends Omit<
    DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'value' | 'defaultValue' | 'type' | 'label'> {
    label?: ReactNode,
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,
    validations?: typeValidations,
    name: string,
}

function InputText({
    label,
    setter,
    getter,
    noLabel,
    validations,

    className,
    onInput,
    name,
    id,

    ...props
}: typeInputTextProps) {

    /**
     * Function Handler
     */
    function onChangeValue(e: FormEvent<HTMLInputElement>) {
        if (onInput) onInput(e)
        setter((prev: typeStateInput) => {
            const valueInput = (e.target as HTMLInputElement).value
            const invalidMessages: string[] = validations ? validator({ validations, value: valueInput }) : []

            return ({
                ...prev,
                values: { ...(prev.values), [name]: valueInput },
                invalids: { ...(prev.invalids), [name]: invalidMessages }
            })
        })
    }


    /**
     * useEffect
     */
    useEffect(() => {
        if (validations?.required) {
            if (getter?.values?.[name] && getter?.uncompleteds?.includes(name)) {
                setter((prev: typeStateInput) => ({
                    ...(prev ?? {}),
                    uncompleteds: (prev?.uncompleteds ?? []).filter((uncompleted) => (uncompleted != name))
                }))
            } else if (!getter?.values?.[name] && !getter?.uncompleteds?.includes(name)) {
                setter((prev: typeStateInput) => ({
                    ...(prev ?? {}),
                    uncompleteds: [...(prev?.uncompleteds ?? []), name]
                }))
            }
        }
    }, [getter])



    /**
     * Render JSX
     */
    return (
        <div className={`input-group ${getter?.invalids?.[name]?.length ? 'input-group-invalid' : ''} ${className}`}>
            {(!noLabel) && (<label htmlFor={id ?? name}>{label ?? name}</label>)}
            <input
                value={getter?.values?.[name] ?? ''}
                onInput={onChangeValue}
                id={id ?? name}
                name={name}
                {...props}
            // type="text"
            />
            {Boolean(getter?.invalids?.[name]?.length) && (
                <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
            )}
        </div>
    )
}

export default InputText