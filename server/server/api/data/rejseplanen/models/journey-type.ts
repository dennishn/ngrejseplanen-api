import {RejseplanenTransportationType} from '../constants/transportation-type';

export interface RejseplanenJourneyType {
    type: RejseplanenTransportationType;
    routeIdxFrom: string;
    routeIdxTo: string;
}