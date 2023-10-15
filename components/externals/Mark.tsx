'use client'

import React from 'react'

function Mark({ text, className }: { text: number, className?: string }) {
    return (
        <div
            className={`mark ${className ?? ''}`}>
            {text}
        </div>
    )
}

export default Mark