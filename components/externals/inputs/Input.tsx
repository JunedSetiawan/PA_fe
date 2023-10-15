'use client'

import InputText, { typeInputTextProps } from './InputText'
import TextArea, { typeTextAreaProps } from './TextArea'

function Input(props: typeFieldInput) {
    if (['textarea'].includes(props.type ?? '')) {
        return (
            <TextArea
                {...props as typeTextAreaProps}
            />
        )
    } else {
        return (
            <InputText
                {...props as typeInputTextProps}
            />
        )
    }
}

export default Input