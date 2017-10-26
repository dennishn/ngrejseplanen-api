import {intToWGS84} from '../utils/geolocation';

interface IStopLocation {
    [key: string]: any
}
interface ICoordLocation {
    [key: string]: any
}

interface IRejseplanenLocationResponse {
    LocationList: {
        noNamespaceSchemaLocation: string;
        StopLocation: IStopLocation[];
        CoordLocation: ICoordLocation[];
    }
}

interface IStopLocationTransformed {
    [key: string]: any
}
interface IRejseplanenLocationTransformedResponse {
    data: IStopLocationTransformed[];
}

export const locationTransformer = (data: IRejseplanenLocationResponse): IRejseplanenLocationTransformedResponse => {
    const responseData: IRejseplanenLocationTransformedResponse = {
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