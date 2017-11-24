import {RejseplanenTransportationType} from '../constants/transportation-type';

export interface RejseplanenDeparture {
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
    diretion?: string;
    cancelled?: string;
    messages?: string;
    finalStop?: string;
    JourneyDetailRef?: {
        ref?: string;
    }
}