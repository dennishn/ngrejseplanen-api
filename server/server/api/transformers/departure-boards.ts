import {parseRefId} from '../utils/rejseplanen';

export const departureBoardsTransformer = (data: any): any => {

    const responseData: any = {
        data: []
    };

    data.MultiDepartureBoard.Departure.forEach((e: any) => {
        const t: any = {};
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