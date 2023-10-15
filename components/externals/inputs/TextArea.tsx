'use client'

import React, { DetailedHTMLProps, Dispatch, FormEvent, InputHTMLAttributes, ReactNode, SetStateAction, useEffect } from 'react'
import validator from './validatorUtils'

export interface typeTextAreaProps extends Omit<DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>, 'value' | 'defaultValue' | 'label'> {
    label?: ReactNode,
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,
    validations?: typeValidations,
    name: string,
}

function TextArea({
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
}: typeTextAreaProps) {


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
     * Function handler
     */
    function onChangeValue(e: FormEvent<HTMLTextAreaElement>) {
        if (onInput) onInput(e)
        setter((prev: typeStateInput) => {
            const valueInput = (e.target as HTMLTextAreaElement).value
            const invalidMessages: string[] = validations ? validator({ validations, value: valueInput }) : []

            return ({
                ...prev,
                values: { ...(prev.values), [name]: valueInput },
                invalids: { ...(prev.invalids), [name]: invalidMessages }
            })
        })
    }


    return (
        <div className={`input-group ${className} ${getter?.invalids?.[name]?.length ? 'input-group-invalid' : ''}`}>
            {(!noLabel) && (<label htmlFor={id ?? name}>{label ?? name}</label>)}
            <textarea
                value={getter?.values?.[name] ?? ''}
                onInput={onChangeValue}
                id={id ?? name}
                name={name}
                {...props}
            ></textarea>
            {Boolean(getter?.invalids?.[name]?.length) && (
                <div className='invalid-message'>{getter?.invalids?.[name][0]}</div>
            )}
        </div>
    )
}

export default TextArea