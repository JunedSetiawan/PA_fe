
import { SquaresFour } from 'phosphor-react'
import React, { useState } from 'react'
import Dropdown from '../externals/popups/Dropdown'

export default function SubAppNavigator() {
    const [ShowDropDownSubApp, setShowDropDownSubApp] = useState(false)
    return (
        <div>
            <div className="header-icon-square" onClick={() => setShowDropDownSubApp(true)}>
                <SquaresFour className="text-2xl" />
            </div>
            <Dropdown show={ShowDropDownSubApp} setShow={setShowDropDownSubApp} className='w-[20rem] right-[2rem] sm:right-[3rem] text-center overflow-hidden'>
                <div className="grid grid-cols-3 gap-1 px-2 pt-2 pb-4">
                    <div className="text-center rounded-xl py-2 cursor-pointer hover:bg-gray-100">
                        <div className="bg-profile mx-auto mb-1 h-[3rem]"></div>
                        <div className="text-[11px]">Data Induk</div>
                    </div>
                    <div className="text-center rounded-xl py-2 cursor-pointer hover:bg-gray-100">
                        <div className="bg-profile mx-auto mb-1 h-[3rem]"></div>
                        <div className="text-[11px]">e-rapot</div>
                    </div>
                </div>
            </Dropdown>
        </div>
    )
}
