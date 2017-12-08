import {intToWGS84} from '../utils/geolocation';
import {RejseplanenLocationResponse} from "../data/rejseplanen/responses/location";
import {ApiLocationResponse} from "../data/api/responses/location";
import {RejseplanenLocationStopLocation} from "../data/rejseplanen/models/location-stop-location";
import {ApiLocationStopLocation} from "../data/api/models/location-stop-location";
import {ParamRegistry} from "ts-express-decorators";
import {RejseplanenCoordLocation} from "../data/rejseplanen/models/coord-location";
import {ApiCoordLocation} from "../data/api/models/coord-location";

export const locationTransformer = (data: RejseplanenLocationResponse): ApiLocationResponse => {
    // How we want the data to be structured when WE return it
    const responseData: ApiLocationResponse = {
        data: {
            stopLocation: [],
            coordLocation: []
        }
    };

    // Not even an "outer" LocationList object -.-
    if(!data.hasOwnProperty('LocationList')) {
        data = Object.assign({}, {
            LocationList: {
                noNamespaceSchemaLocation: '',
                StopLocation: [],
                CoordLocation: []
            }
        })
    }

    // There was no StopLocation items
    if(!data.LocationList.hasOwnProperty('StopLocation')) {
        data.LocationList.StopLocation = [];
    }
    // There was ONE StopLocation item
    if(!Array.isArray(data.LocationList.StopLocation)) {
        data.LocationList.StopLocation = [data.LocationList.StopLocation];
    }

    // There was no CoordLocation items
    if(!data.LocationList.hasOwnProperty('CoordLocation')) {
        data.LocationList.CoordLocation = [];
    }
    // There was ONE CoordLocation item
    if(!Array.isArray(data.LocationList.CoordLocation)) {
        data.LocationList.CoordLocation = [data.LocationList.CoordLocation];
    }

    // Time to format and sanitize
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

    data.LocationList.CoordLocation.forEach((e: RejseplanenCoordLocation) => {
        const t: ApiCoordLocation = <ApiCoordLocation>{};

        Object.keys(e).forEach((key: string) => {
            switch(key) {
                case 'x':
                case 'y': {
                    t[key] = intToWGS84(parseInt(e[key]));
                    break;
                }
                case 'name':
                    t[key] = e[key];
                    break;
                case 'type':
                    t[key] = e[key];
                    break;
                default:
                    const errorMessage = `RejseplanenLocationCoordLocation had a key that was not present in the interface definition: ${key}`;
                    console.log(errorMessage);
                    throw new Error(errorMessage);
            }
        });

        responseData.data.coordLocation.push(t);
    });

    return responseData;
};
