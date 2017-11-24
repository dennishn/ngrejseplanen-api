import {RejseplanenBaseResponse} from './base-response';
import {RejseplanenLocationStopLocation} from '../models/location-stop-location';
import {RejseplanenCoordLocation} from '../models/coord-location';

export interface RejseplanenLocationResponse extends RejseplanenBaseResponse {
    LocationList: {
        noNamespaceSchemaLocation: string;
        StopLocation?: RejseplanenLocationStopLocation[];
        CoordLocation?: RejseplanenCoordLocation[];
    }
}
