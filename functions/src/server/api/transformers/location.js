"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geolocation_1 = require("../utils/geolocation");
exports.locationTransformer = (data) => {
    const responseData = {
        data: {
            stopLocation: []
        }
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
                    t[key] = parseInt(e[key]);
                    break;
                // case 'name':
                //     t[key] = e[key];
                //     break;
                default:
                    const errorMessage = `RejseplanenLocationStopLocation had a key that was not present in the interface definition: ${key}`;
                    console.log(errorMessage);
                    throw new Error(errorMessage);
            }
        });
        responseData.data.stopLocation.push(t);
    });
    return responseData;
};
