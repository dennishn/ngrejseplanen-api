import {RejseplanenTransportationType} from '../../rejseplanen/constants/transportation-type';

export interface ApiArrival {
    name: string;
    type: RejseplanenTransportationType;
    stop: string;
    date: string;
    // time: string;
    // date: string;
    // optionals
    track?: string;
    rtDate?: string,
    // rtTime?: string;
    // rtDate?: string;
    rtTrack?: string;
    origin?: string;
    cancelled?: string;
    messages?: string;
    ref?: string;
    // JourneyDetailRef?: {
    //     ref?: string;
    // }
}