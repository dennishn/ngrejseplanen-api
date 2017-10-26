import {parseRefId} from '../utils/rejseplanen';

interface IDeparture {
    [key: string]: any;
}

interface IRejseplanenDepartureBoardsResponse {
    MultiDepartureBoard: {
        noNamespaceSchemaNearby: string;
        Departure: IDeparture[];
    }
}

interface IDepartureTransformed {
    [key: string]: any;
}
interface IRejseplanenDepartureBoardsTransformedResponse {
    data: IDepartureTransformed[];
}

export const departureBoardsTransformer = (data: IRejseplanenDepartureBoardsResponse): IRejseplanenDepartureBoardsTransformedResponse => {

    const responseData: IRejseplanenDepartureBoardsTransformedResponse = {
        data: []
    };

    data.MultiDepartureBoard.Departure.forEach((e: IDeparture) => {
        const t: {[key: string]: any} = {};
        Object.keys(e).forEach((key: string) => {
            switch(key) {
                case 'JourneyDetailRef':
                    t['ref'] = parseRefId(e.JourneyDetailRef.ref);
                    break;
                default:
                    t[key] = e[key];
            }
        });
        responseData.data.push(t);
    });

    return responseData;
};