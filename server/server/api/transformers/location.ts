import {intToWGS84} from '../utils/geolocation';
import {RejseplanenLocationResponse} from "../data/rejseplanen/responses/location";
import {ApiLocationResponse} from "../data/api/responses/location";
import {RejseplanenLocationStopLocation} from "../data/rejseplanen/models/location-stop-location";
import {ApiLocationStopLocation} from "../data/api/models/location-stop-location";

export const locationTransformer = (data: RejseplanenLocationResponse): ApiLocationResponse => {
    const responseData: ApiLocationResponse = {
        data: {
            stopLocation: [],
            coordLocation: []
        }
    };

    data.LocationList.StopLocation.forEach((e: RejseplanenLocationStopLocation) => {
        const t: ApiLocationStopLocation = <ApiLocationStopLocation>{};

        Object.keys(e).forEach((key: string) => {
            switch(key) {
                case 'x':
                case 'y': {
                    t[key] = intToWGS84(parseInt(e[key]));
                    break;
                }
                case 'id':
                    t[key] = parseInt(e[key]);
                    break;
                case 'name':
                    t[key] = e[key];
                    break;
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
