export function assertNull(value: null) {
    return value === null;
}

export function assertUndefined(value: undefined) {
    return value === undefined;
}

export function assertError(value: Error) {
    return value && value instanceof Error;
}

export function assertNumber(value: number) {
    return typeof value === 'number';
}
