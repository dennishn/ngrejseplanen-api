import {ApiBaseResponse} from './base-response';
import {ApiDeparture} from '../models/departure';

export interface ApiMultiDepartureBoardResponse extends ApiBaseResponse {
    data: ApiDeparture[];
}
