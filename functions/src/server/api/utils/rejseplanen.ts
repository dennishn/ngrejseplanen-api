export const parseRefId = (ref: string): string => {
    const decodedRef = decodeURIComponent(ref);
    return decodedRef.split('?ref=').pop().split('?date').shift()
};