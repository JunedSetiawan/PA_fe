import { ReactNode } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
interface typeDynamicCardTitleProps {
    label: ReactNode,
    isDisablePrev?: boolean,
    onPrev: () => any,
    isDisableNext?: boolean,
    onNext: () => any,
}

export default function DynamicCardTitle({ label, isDisablePrev, onPrev, isDisableNext, onNext }: typeDynamicCardTitleProps) {
    return (
        <div className="grid grid-cols-9 items-center">
            <div className='flex justify-start'>
                {!isDisablePrev && (
                    <div className="btn-square" onClick={onPrev}>
                        <CaretLeft />
                    </div>
                )}
            </div>
            <div className="col-span-7 text-center">{label}</div>
            <div className='flex justify-end'>
                {!isDisableNext && (
                    <div className="btn-square" onClick={onNext}>
                        <CaretRight />
                    </div>
                )}
            </div>
        </div>
    )
}
