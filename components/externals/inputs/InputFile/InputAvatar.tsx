'use client'
import React, { useState } from 'react'
import CropImage from './CropImage'
import { api } from '@/utils/frontend'
import { useRouter } from 'next/navigation'
import { Camera } from 'phosphor-react'

interface typeInputAvatar {
    name?: string,
    path?: string,
    src?: string
}
export default function InputAvatar({
    name,
    path,
    src
}: typeInputAvatar) {
    const router = useRouter()
    const [ShowModal, setShowModal] = useState(false)

    function onSubmit(imageCropped: File) {
        const formData = new FormData();
        formData.append((name ?? 'photo_profile'), imageCropped);
        api({
            path: path ?? '/edit-avatar',
            method: 'POST',
            body: formData
        }).then((res) => {
            if (res.status == 200) {
                setShowModal(false)
                router.refresh()
            }
        })
    }

    return (
        <div>
            <div
                onClick={() => setShowModal(true)}
                className='bg-profile h-[5rem] cursor-pointer hover:first:bg-black50 overflow-hidden flex flex-col-reverse'
                style={{ backgroundImage: `URL('${src}')` }}
            >
                <div className='bg-black/30 text-gray-200 mt-auto'>
                    <Camera />
                </div>
            </div>
            <CropImage
                show={ShowModal}
                onCancel={() => setShowModal(false)}
                onSelect={onSubmit}
                aspectRatio={1}
            />
        </div>
    )
}
