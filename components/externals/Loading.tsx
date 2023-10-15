import React from 'react'

export default function Loading({
    status
}: {
    status: number
}) {
    return (
        <div className='w-full h-[10rem] flex'>
            <div className='m-auto'>
                loading..
            </div>
        </div>
    )
}
