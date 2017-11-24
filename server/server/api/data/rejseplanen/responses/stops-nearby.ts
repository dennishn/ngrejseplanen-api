import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenNearbyStopLocation} from '../models/nearby-stop-location';

export interface RejseplanenStopsNearbyResponse extends RejseplanenBaseResponse {
    LocationList: {
        noNamespaceSchemaLocation: string;
        StopLocation?: RejseplanenNearbyStopLocation[];
    }
}
