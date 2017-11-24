import {TransportationType} from "../constants/transportation-type";

export interface ApiArrival {
    name: string;
    type: TransportationType;
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
