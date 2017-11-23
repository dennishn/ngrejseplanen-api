"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRefId = (ref) => {
    const decodedRef = decodeURIComponent(ref);
    return decodedRef.split('?ref=').pop().split('?date').shift();
};
