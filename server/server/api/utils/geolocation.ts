/*
    From Rejseplanen docs:

    Coordinates are always in the WGS84 system. All coordinates a represented as integer
    values x and y where the coordinate value is multiplied with 1,000,000.
 */
export const intToWGS84 = (number: number): number => {
    return number / 1000000;
};