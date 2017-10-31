import {ApiBaseResponse} from './base-response';
import {ApiLocationStopLocation} from '../models/location-stop-location';
import {ApiCoordLocation} from '../models/coord-location';

export interface ApiLocationResponse extends ApiBaseResponse {
    data: {
        stopLocation?: ApiLocationStopLocation[];
        coordLocation?: ApiCoordLocation[];
    }
    // LocationList: {
    //     noNamespaceSchemaLocation: string;
    //     StopLocation?: ApiLocationStopLocation[];
    //     CoordLocation?: ApiCoordLocation[];
    // }
}
