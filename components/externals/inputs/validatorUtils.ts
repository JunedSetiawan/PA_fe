

export default function validator({
    validations,
    value
}: {
    validations: typeValidations,
    value: any,
}) {
    let invalidMessages: string[] = [];

    if ((validations.required) || value) {
        if (!value && (value !== undefined)) {
            invalidMessages.push('Field tidak boleh kosong!')
        }
        if (validations.max && validations.max < value?.length) {
            invalidMessages.push(`Harus kurang dari ${validations.max} karakter!`)
        }
        if (validations.min && validations.min > value?.length) {
            invalidMessages.push(`Harus lebih dari ${validations.min} karakter!`)
        }
        if (validations.length && validations.length != value?.length) {
            invalidMessages.push(`Harus berisi ${validations.length} karakter!`)
        }
    }

    return invalidMessages;
}