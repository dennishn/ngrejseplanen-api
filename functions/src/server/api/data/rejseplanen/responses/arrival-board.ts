import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenArrival} from '../models/arrival';

export interface RejseplanenArrivalBoardResponse extends RejseplanenBaseResponse {
    ArrivalBoard: {
        noNamespaceSchemaLocation: string;
        Arrival?: RejseplanenArrival[];
    }
}
