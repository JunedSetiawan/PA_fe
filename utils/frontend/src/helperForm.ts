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