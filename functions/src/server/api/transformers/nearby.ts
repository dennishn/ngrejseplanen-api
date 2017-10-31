import {intToWGS84} from '../utils/geolocation';
import {RejseplanenStopsNearbyResponse} from '../data/rejseplanen/responses/stops-nearby';
import {ApiStopsNearbyResponse} from '../data/api/responses/stops-nearby';

export const nearbyTransformer = (data: RejseplanenStopsNearbyResponse): ApiStopsNearbyResponse => {
    const responseData: ApiStopsNearbyResponse = {
        data: []
    };

    data.LocationList.StopLocation.forEach((e: any) => {
        const t: any = {};

        Object.keys(e).forEach((key: string) => {
            switch(key) {
                case 'x':
                case 'y': {
                    t[key] = intToWGS84(parseInt(e[key]));
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