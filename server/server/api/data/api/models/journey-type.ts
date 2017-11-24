import {RejseplanenTransportationType} from '../../rejseplanen/constants/transportation-type';

export interface ApiJourneyType {
    type: RejseplanenTransportationType;
    routeIdxFrom: string;
    routeIdxTo: string;
}