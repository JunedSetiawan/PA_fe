'use client'

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


type typeButtonProps = {
    isLoading?: boolean,
    isResponsive?: boolean,
    text?: ReactNode
} & DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>

export default function Button({
    className,
    text,
    isLoading,
    disabled,
    isResponsive,
    ...props
}: (typeButtonProps)) {
    return (
        <button className={`btn ${isLoading ? 'btn-loading' : ''} ${className ?? ''}`}
            {...props}
            disabled={isLoading ? true : disabled}
        >{text}</button>
    )
}