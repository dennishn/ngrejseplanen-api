import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenDeparture} from '../models/departure';

export interface RejseplanenMultiDepartureBoardResponse extends RejseplanenBaseResponse {
    MultiDepartureBoard: {
        noNamespaceSchemaLocation: string;
        Departure?: RejseplanenDeparture[];
    }
}
