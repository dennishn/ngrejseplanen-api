import {ApiBaseResponse} from './base-response';
import {ApiDeparture} from '../models/departure';

export interface ApiDepartureBoardResponse extends ApiBaseResponse {
    data: ApiDeparture[];
    // DepartureBoard: {
    //     noNamespaceSchemaLocation: string;
    //     Departure?: ApiDeparture[];
    // }
}
