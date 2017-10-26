import {intToWGS84} from '../utils/geolocation';

interface IStopLocation {
    [key: string]: any
}

interface IRejseplanenNearbyResponse {
    LocationList: {
        noNamespaceSchemaNearby: string;
        StopLocation: IStopLocation[];
    }
}

interface IStopLocationTransformed {
    [key: string]: any
}
interface IRejseplanenNearbyTransformedResponse {
    data: IStopLocationTransformed[];
}

export const nearbyTransformer = (data: IRejseplanenNearbyResponse): IRejseplanenNearbyTransformedResponse => {
    const responseData: IRejseplanenNearbyTransformedResponse = {
        data: []
    };

    data.LocationList.StopLocation.forEach((e: IStopLocation) => {
        const t: {[key: string]: any} = {};
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
                default:
                    t[key] = e[key];
            }
        });
        responseData.data.push(t);
    });

    return responseData;
};