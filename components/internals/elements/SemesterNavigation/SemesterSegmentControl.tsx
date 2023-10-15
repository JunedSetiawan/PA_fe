import SegmentControl from '@/components/externals/SegmentControl'
import React, { Dispatch, SetStateAction, useState } from 'react'

export default function SemesterSegmentControl({
    onChange,
    value,
    className
}: {
    onChange: (newValue: (1 | 2)) => any,
    value: (1 | 2),
    className?: string
}) {
    return (
        <SegmentControl
            segmentNavigations={[
                {
                    label: 'Semester 1',
                    value: 1
                },
                {
                    label: 'Semester 2',
                    value: 2
                }
            ]}
            onChange={onChange}
            value={value}
            className={className}
        />
    )
}
