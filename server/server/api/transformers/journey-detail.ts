import {parseRefId} from '../utils/rejseplanen';
import {RejseplanenJourneyDetailResponse} from "../data/rejseplanen/responses/journey-detail";
import {ApiJourneyDetailResponse} from "../data/api/responses/journey-detail";

export const journeyDetailTransformer = (data: RejseplanenJourneyDetailResponse): ApiJourneyDetailResponse => {
    const responseData: any = {
        data: []
    };

    data.JourneyDetail.Stop.forEach((e: any) => {
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
