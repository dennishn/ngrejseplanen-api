import {RejseplanenTransportationType} from '../constants/transportation-type';

export interface RejseplanenArrival {
    name: string;
    type: RejseplanenTransportationType;
    stop: string;
    time: string;
    date: string;
    // optionals
    track?: string;
    rtTime?: string;
    rtDate?: string;
    rtTrack?: string;
    origin?: string;
    cancelled?: string;
    messages?: string;
    JourneyDetailRef?: {
        ref?: string;
    }
}