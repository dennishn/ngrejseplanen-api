"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    From Rejseplanen docs:

    Coordinates are always in the WGS84 system. All coordinates a represented as integer
    values x and y where the coordinate value is multiplied with 1,000,000.
 */
exports.intToWGS84 = (number) => {
    return number / 1000000;
};
