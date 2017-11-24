import {ApiBaseResponse} from './base-response';
import {ApiStop} from '../models/stop';
import {ApiJourneyName} from '../models/journey-name';
import {ApiJourneyType} from '../models/journey-type';
import {ApiNote} from '../models/note';

export interface ApiJourneyDetailResponse extends ApiBaseResponse {
    data: {
        stop?: ApiStop[];
        journeyName?: ApiJourneyName;
        journeyType?: ApiJourneyType;
        note?: ApiNote[];
    };
    // JourneyDetail: {
    //     noNamespaceSchemaLocation: string;
    //     Stop?: RejseplanenStop[];
    //     JourneyName?: RejseplanenJourneyName[];
    //     JourneyType?: RejseplanenJourneyType[];
    //     Note?: RejseplanenNote[];
    // }
}
