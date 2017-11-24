import {ApiBaseResponse} from './base-response';
import {ApiArrival} from '../models/arrival';

export interface ApiArrivalBoardResponse extends ApiBaseResponse {
    data: ApiArrival[];
    /*ArrivalBoard: {
        noNamespaceSchemaLocation: string;
        Arrival?: ApiArrival[];
    }*/
}
