import {RejseplanenLocationType} from '../../rejseplanen/constants/location-type';

export interface ApiCoordLocation {
    x: number;
    y: number;
    name: string;
    type: RejseplanenLocationType;
}