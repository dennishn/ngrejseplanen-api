import {LocationType} from "../constants/location-type";

export interface ApiCoordLocation {
    x: number;
    y: number;
    name: string;
    type: LocationType;
}
