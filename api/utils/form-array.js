export function formValueToArray(value) {
    if (Array.isArray(value)) {
        return value;
    }

    if (value) {
        return [value];
    }

    return [];
}
