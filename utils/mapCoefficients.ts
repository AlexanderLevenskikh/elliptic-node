export function mapCoefficients(arr: number[]) {
    arr.sort();

    if (arr.length === 0) {
        return [];
    }

    const degree = arr[arr.length - 1];
    const coefficientsMap: { [ key: number]: boolean } = arr.reduce((res, elem) => ({ ...res, [elem]: true}), {});

    return Array
        .from(Array(degree + 1))
        .map((_, index: number) => Boolean(coefficientsMap[index]));
}
