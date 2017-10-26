import {parseRefId} from '../utils/rejseplanen';

interface IStop {
    [key: string]: any;
}

interface IRejseplanenJourneyDetailResponse {
    JourneyDetail: {
        noNamespaceSchemaNearby: string;
        Stop: IStop[];
    }
}

interface IStopTransformed {
    [key: string]: any;
}
interface IRejseplanenJourneyDetailTransformedResponse {
    data: IStopTransformed[];
}

export const journeyDetailTransformer = (data: IRejseplanenJourneyDetailResponse): IRejseplanenJourneyDetailTransformedResponse => {
    const responseData: IRejseplanenJourneyDetailTransformedResponse = {
        data: []
    };

    data.JourneyDetail.Stop.forEach((e: IStop) => {
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