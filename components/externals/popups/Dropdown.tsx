
import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction, useRef } from "react";

type MyDropdownProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> & {
    justHidden?: boolean,
    show: boolean,
    setShow: Dispatch<SetStateAction<any | ((prev: any) => void)>>,
}


export default function Dropdown({
    justHidden,
    show,
    setShow,
    children,
    className,
    ref,
    ...props
}: MyDropdownProps) {
    return (
        <>
            {(show || justHidden) && (
                <div className={`${!show ? 'hidden' : ''}`}>
                    <div className="fixed inset-0 z-20" onClick={() => setShow(false)}></div>
                    <div
                        className={`absolute z-20 card rounded-xl ${className}`} //overflow-hidden
                        {...props}
                    >
                        {children}
                    </div >
                </div>
            )}
        </>
    )
}