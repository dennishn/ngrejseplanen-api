import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenDeparture} from '../models/departure';

export interface RejseplanenDepartureBoardResponse extends RejseplanenBaseResponse {
    DepartureBoard: {
        noNamespaceSchemaLocation: string;
        Departure?: RejseplanenDeparture[];
    }
}
