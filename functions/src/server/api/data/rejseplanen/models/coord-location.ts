import {RejseplanenLocationType} from '../constants/location-type';

export interface RejseplanenCoordLocation {
    x: string;
    y: string;
    name: string;
    type: RejseplanenLocationType;
}