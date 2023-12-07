
import { X } from 'phosphor-react'
import { Dispatch, SetStateAction } from "react"




type MyHeaderModalProps = {
    title?: string,
    setShow: Dispatch<SetStateAction<any | ((prev: any) => void)>>,
}


export default function HeaderModal({ title, setShow }: MyHeaderModalProps) {
    return (
        <div className="card-header">
            <div className="card-title">
                {title}
            </div>
            <div className="cursor-pointer"
                onClick={() => { setShow(null) }}>
                <X className="text-lg hover:text-gray-500" />
            </div>
        </div>

    )
}