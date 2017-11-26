"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rejseplanen_1 = require("../utils/rejseplanen");
exports.journeyDetailTransformer = (data) => {
    const responseData = {
        data: []
    };
    data.JourneyDetail.Stop.forEach((e) => {
        const t = {};
        Object.keys(e).forEach((key) => {
            switch (key) {
                case 'JourneyDetailRef':
                    t['ref'] = rejseplanen_1.parseRefId(e.JourneyDetailRef.ref);
                    break;
                default:
                    t[key] = e[key];
            }
        });
        responseData.data.push(t);
    });
    return responseData;
};
