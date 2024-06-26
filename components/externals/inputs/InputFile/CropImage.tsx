import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Button from '../../Button'
import { Plus, Warning, FolderNotch } from 'phosphor-react'
import { Crop, ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { blobToFile } from '@/utils/general'
interface typeCropImageProps {
    aspectRatio?: number,
    onSelect: (file: File) => any,
    onCancel: Function,
    placeholder?: ReactNode,
    defaultValue?: any,
    show: boolean
}
export default function CropImage(props: typeCropImageProps) {

    return (props.show) ? <ChildCropImage {...props} /> : <></>
}

function ChildCropImage({
    aspectRatio = 0,
    placeholder,
    onSelect,
    onCancel,
    defaultValue
}: Omit<typeCropImageProps, 'show'>) {
    const refInputImage = useRef<HTMLInputElement>(null)
    const canvasCrop = useRef<HTMLImageElement>(null)
    const [Crop, setCrop] = useState<Crop>()
    const [ImageMaster, setImageMaster] = useState<File>();
    const [Invalids, setInvalids] = useState<string[]>()

    useEffect(() => {
        if (!ImageMaster && defaultValue) {
            if (defaultValue instanceof File) {
                setImageMaster(defaultValue)
            } else if (defaultValue instanceof Blob) {
                setImageMaster(new File([defaultValue], "filename", { type: 'image/jpg' }))
            } else {
                fetch(defaultValue).then(async (res) => {
                    try {
                        const fileName = (defaultValue as string).split('/')
                        const blob = await res.blob();
                        const file = new File([blob], fileName[fileName.length - 1], { type: 'image/jpg' })
                        setImageMaster(file)
                    } catch (err) { }
                })
            }
        }
    }, [defaultValue]);




    return (
        <div className='modal'>
            <div className="card max-w-2xl mx-auto h-min">
                <div className="card-body p-10">
                    <input
                        type="file"
                        className='hidden'
                        ref={refInputImage}
                        onChange={(e) => {
                            const blobFile = e.target.files?.[0]
                            if (blobFile) {
                                const invalids = []

                                if (blobFile && !new RegExp('image[/*]').test(blobFile.type)) {
                                    invalids.push(`File ${blobFile.name} tidak valid`)
                                }

                                setInvalids(invalids)
                                setImageMaster(blobFile)
                                setCrop(undefined)
                            }
                        }}
                        accept='image/*'
                    />
                    {(!ImageMaster || Invalids?.length) ? (
                        <>
                            <div
                                onClick={() => refInputImage?.current?.click()}
                                className={`aspect-square w-full bg-gray-50 border-gray-300 border border-dashed rounded-xl block cursor-pointer`}
                            >
                                <div className={`flex items-center justify-center flex-col aspect-square`}>
                                    {!Invalids?.length ? (
                                        <>
                                            <div>
                                                <Plus className='text-[4rem]'/>
                                            </div>
                                            <div>
                                                {placeholder ?? 'Pilih Foto Yang Akan Di Gunakan'}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <Warning className='text-[4rem]'/>
                                            </div>
                                            <div className='mt-1 text-center'>
                                                <div>File Yang Anda Pilih Harus Berupa gambar!</div>
                                                <div className='text-xs mt-[.2rem]'>{Invalids[0]}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <ReactCrop
                            crop={Crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            aspect={aspectRatio}
                        >
                            <img
                                ref={canvasCrop}
                                alt="Foto yang diunggah"
                                src={URL.createObjectURL(ImageMaster)}
                            />
                        </ReactCrop>
                    )}
                </div>
                <div className="card-footer pt-0 pb-8 px-10">
                    {!!ImageMaster && (
                        <div>
                            <Button
                                type='button'
                                text={
                                    <>
                                        <FolderNotch className='mr-1 mb-[1px]'/>
                                        <span>Ganti File</span>
                                    </>
                                }
                                className='btn-outline gap-1 bg-gray-100'
                                onClick={() => refInputImage?.current?.click()}
                            />
                        </div>
                    )}
                    <div className='ml-auto flex items-center gap-2'>
                        <Button
                            type='button'
                            text='batal'
                            className='btn-outline hover:bg-gray-100'
                            onClick={() => onCancel()}
                        />
                        <Button
                            type='button'
                            text='pilih'
                            className='px-6 bg-primary'
                            disabled={!Crop}
                            onClick={() => {
                                if (Crop && canvasCrop.current) {
                                    const imageCropped = cropping({
                                        crop: Crop,
                                        img: canvasCrop.current,
                                        resultFileName: ImageMaster?.name ?? 'imageCropped.png'
                                    })
                                    if (imageCropped) onSelect(imageCropped)
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}




function cropping({ crop, img, resultFileName }: { crop: Crop, img: HTMLImageElement, resultFileName: string }) {
    /**
     * Make canvas for cropping img
     */
    const canvas = document.createElement("canvas");
    canvas.width = Number(crop?.width) / 100 * Number(img?.width);
    canvas.height = Number(crop?.height) / 100 * Number(img?.height);
    const ctx = canvas.getContext("2d");
    if (ctx && img) {
        /**
         * Draw image to canvas
         */
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
            img,
            (Number(crop?.x) / 100) * img.naturalWidth,
            (Number(crop?.y) / 100) * img.naturalHeight,
            (Number(crop?.width) / 100) * img.naturalWidth,
            (Number(crop?.height) / 100) * img.naturalHeight,
            0,
            0,
            (Number(crop?.width) / 100) * img.width,
            (Number(crop?.height) / 100) * img.height,
        );


        /**
         * URL to blob
         */
        const base64Image = canvas.toDataURL("image/jpeg", 1);
        const resultFile = blobToFile(base64Image, resultFileName)
        return resultFile
    }
}