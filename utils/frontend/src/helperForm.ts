import { Dispatch, SetStateAction } from "react";

export function isInvalidForm(getter: typeStateInput) {
    if (getter?.uncompleteds?.length) return true
    for (const invalidMessages of Object.values(getter?.invalids ?? {})) {
        if (invalidMessages?.length) return true
    }
    return false
}


export function changeAttributeInput(target: any, attribute: string, value: any) {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, attribute)
        ?.set?.call(target, value);
    var eventChange = new Event('change', { bubbles: true });
    target.dispatchEvent(eventChange);
}



// for 422 default response BFF adonisJS
export const onInvalidRequestAdonis = (
    errors: any,
    setter?: Dispatch<SetStateAction<typeStateInput | ((prev: typeStateInput) => void)>>
) => {
    const invalids: Record<string, any> = {}

    for (const error of errors) {
        const { field, message } = error
        invalids[field] = [...(invalids?.[field] ?? []), message]
    }

    if (setter) {
        setter((prev: typeStateInput) => ({
            ...(prev ?? {}),
            invalids
        }))
    }

    return invalids
}