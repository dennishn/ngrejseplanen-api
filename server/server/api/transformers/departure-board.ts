import {makeUtcDate, parseRefId} from '../utils/rejseplanen';
import {RejseplanenDeparture} from "../data/rejseplanen/models/departure";

export const departureBoardTransformer = (data: any): any => {
    const responseData: any = {
        data: []
    };

    data.DepartureBoard.Departure.forEach((e: any) => {
        const t: any = {};
        Object.keys(e).forEach((key: string) => {
            switch(key) {
                case 'JourneyDetailRef':
                    t['ref'] = parseRefId(e.JourneyDetailRef.ref);
                    break;
                case 'date':
                    t['date'] = makeUtcDate(e.date, e.time);
                    break;
                case 'rtTime':
                    t['rtDate'] = makeUtcDate(e.rtDate, e.rtTime);
                default:
                    t[key] = e[key];
            }
        });
        responseData.data.push(t);
    });

    return responseData;
};
