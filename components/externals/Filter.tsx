'use client'

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import Button from './Button'
import Mark from './Mark'
import Modal from './popups/Modal'



interface typeFilterProps {
    setter: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>,
    getter: typeStateInput,
    children?: ReactNode
}

function Filter({ setter, getter, children }: typeFilterProps) {
    const [ShowMoadal, setShowMoadal] = useState(false)
    return (<>
        <Button
            className='h-[2.25rem] btn-outline border-gray-400 gap-1'
            onClick={() => { setShowMoadal(true) }}
            text={<>
                {false ? (
                    <Mark text={99} className='mb-[2px]' />
                ) : (
                    <i className='bi bi-sliders2' />
                )}
                <span>Filter</span>
            </>}
        />
        <Modal show={ShowMoadal} toHide={() => setShowMoadal(false)}>
            <div className='max-w-xl w-full m-auto'>
                <div className='card'>
                    <div className="card-header">
                        <div className="card-title">Filter Estrakulikuler</div>
                    </div>
                    <div className="card-body">
                        on going!
                    </div>
                    <div className="card-footer">
                        <div className="ml-auto flex gap-2">
                            <Button
                                type='button'
                                text='batal'
                                className='btn-outline hover:bg-gray-100'
                                onClick={() => setShowMoadal(false)}
                            />
                            <Button text="Terapkan" className='ml-auto' />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </>)
}

export default Filter