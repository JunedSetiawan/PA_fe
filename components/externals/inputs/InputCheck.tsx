'use client'
import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, ReactNode, SetStateAction } from "react"


interface InputCheckProps extends Omit<
    DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >,
    'value' | 'defaultValue' | 'type' | 'label'> {
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    noLabel?: boolean,

    name: string,
    type: "checkbox" | "radio",
    label?: ReactNode,
}

export default function InputCheck({
    label,
    setter,
    getter,
    noLabel,

    className,
    onChange,
    name,
    type,
    id,

    ...props
}: InputCheckProps) {

    return (
        <>
            <div className={`${type == 'checkbox' ? 'input-checkbox' : 'input-radio'} ${className}`}>
                <input
                    id={id ?? name}
                    name={name}
                    type={type}
                    onChange={(e) => {
                        if (onChange) onChange(e)
                        setter((prev: typeStateInput) => ({
                            ...prev,
                            values: { ...((prev)?.values ?? {}), [name]: (e.target.checked) }
                        }))
                    }}
                    {...props}
                />
                {!noLabel && (<label htmlFor={id ?? name}>{label ?? name}</label>)}
            </div>
        </>
    )
}

