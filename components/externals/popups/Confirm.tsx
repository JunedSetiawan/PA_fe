'use client'

import { Dispatch, SetStateAction } from "react";



type MyConfirmProps = {
    question?: string,
    onApproved?: () => any,
    approvedLabel?: string,
    deniedLabel?: string,
    show: boolean,
    setShow: Dispatch<SetStateAction<any | ((prev: any) => void)>>,
    isLoading?: boolean,
    className?: string,
}

export default function Confirm({
    question,
    onApproved,
    approvedLabel,
    deniedLabel,
    show,
    setShow,
    isLoading,
    className
}: MyConfirmProps) {
    return (
        <div className={`modal md:pb-[16rem] ${!show ? 'hidden' : ''} ${className}`}
            onClick={(e) => {
                if (e.target == e.currentTarget) {
                    setShow(false)
                }
            }}>
            <div className='max-w-md w-full m-auto'>
                <div className="card overflow-hidden text-center">
                    <div className="pt-10 pb-8 text-lg">
                        {question ?? 'Anda benar ingin melakukan hal ini?'}
                    </div>
                    <div className="grid grid-cols-2 border-t divide-x">
                        <div className="py-3 cursor-pointer hover:bg-slate-50"
                            onClick={onApproved}>
                            {approvedLabel ?? 'Ya'}
                        </div>
                        <div className="py-3 cursor-pointer hover:bg-slate-50"
                            onClick={() => setShow(false)}>
                            {deniedLabel ?? 'Batal'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}