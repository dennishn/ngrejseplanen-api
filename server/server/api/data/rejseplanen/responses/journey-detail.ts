import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenStop} from '../models/stop';
import {RejseplanenJourneyName} from '../models/journey-name';
import {RejseplanenJourneyType} from '../models/journey-type';
import {RejseplanenNote} from '../models/note';

export interface RejseplanenJourneyDetailResponse extends RejseplanenBaseResponse {
    JourneyDetail: {
        noNamespaceSchemaLocation: string;
        Stop?: RejseplanenStop[];
        JourneyName?: RejseplanenJourneyName[];
        JourneyType?: RejseplanenJourneyType[];
        Note?: RejseplanenNote[];
    }
}
