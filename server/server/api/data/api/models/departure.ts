import {RejseplanenTransportationType} from '../../rejseplanen/constants/transportation-type';

export interface ApiDeparture {
    name: string;
    type: RejseplanenTransportationType;
    stop: string;
    date: string;
    // time: string;
    // date: string;
    // optionals
    track?: string;
    rtDate: string;
    // rtTime?: string;
    // rtDate?: string;
    rtTrack?: string;
    diretion?: string;
    cancelled?: boolean;
    messages?: string;
    finalStop?: string;
    ref?: string;
    // JourneyDetailRef?: {
    //     ref?: string;
    // }
}