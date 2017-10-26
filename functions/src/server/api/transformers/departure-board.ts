import {parseRefId} from '../utils/rejseplanen';

interface IDepartureBoard {
    [key: string]: any;
}

interface IRejseplanenDepartureBoardResponse {
    DepartureBoard: {
        noNamespaceSchemaNearby: string;
        Departure: IDepartureBoard[];
    }
}

interface IDepartureBoardTransformed {
    [key: string]: any;
}
interface IRejseplanenDepartureBoardTransformedResponse {
    data: IDepartureBoardTransformed[];
}

export const departureBoardTransformer = (data: IRejseplanenDepartureBoardResponse): IRejseplanenDepartureBoardTransformedResponse => {
    const responseData: IRejseplanenDepartureBoardTransformedResponse = {
        data: []
    };

    data.DepartureBoard.Departure.forEach((e: IDepartureBoard) => {
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