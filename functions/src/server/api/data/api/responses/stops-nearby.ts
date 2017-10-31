import {ApiBaseResponse} from './base-response';
import {ApiNearbyStopLocation} from '../models/nearby-stop-location';

export interface ApiStopsNearbyResponse extends ApiBaseResponse {
    data:  ApiNearbyStopLocation[];
}
