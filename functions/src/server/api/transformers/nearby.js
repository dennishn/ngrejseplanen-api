"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geolocation_1 = require("../utils/geolocation");
exports.nearbyTransformer = (data) => {
    const responseData = {
        data: []
    };
    data.LocationList.StopLocation.forEach((e) => {
        const t = {};
        Object.keys(e).forEach((key) => {
            switch (key) {
                case 'x':
                case 'y': {
                    t[key] = geolocation_1.intToWGS84(parseInt(e[key]));
                    break;
                }
                case 'id':
                case 'distance':
                    t[key] = parseInt(e[key]);
                    break;
                case 'name':
                    t[key] = e[key];
            }
        });
        responseData.data.push(t);
    });
    return responseData;
};
