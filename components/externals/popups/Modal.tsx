'use client'

import { MouseEvent, ReactNode } from "react";



type typeModalProps = {
    children?: ReactNode,
    show: boolean,
    toHide: Function,
    justHidden?: boolean,
    className?: string,
}

export default function Modal({ children, show, toHide, justHidden, className }: typeModalProps) {

    return (
        <>
            {(show || justHidden) && (
                <div className={`modal ${!show ? 'hidden' : ''} ${className}`}
                    onClick={(e: MouseEvent<HTMLDivElement>) => {
                        if (e.target == e.currentTarget) {
                            toHide()
                        }
                    }}>
                    {children}
                </div >
            )
            }
        </>
    )
}