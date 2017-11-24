import {TransportationType} from "../constants/transportation-type";

export interface ApiJourneyType {
    type: TransportationType;
    routeIdxFrom: string;
    routeIdxTo: string;
}
