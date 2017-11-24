export interface RejseplanenStop {
    name: string;
    x: string;
    y: string;
    // Optional
    routeIdx?: string;
    depTime?: string;
    depDate?: string;
    arrTime?: string;
    arrDate?: string;
    track?: string;
    rtDepTime?: string;
    rtDepDate?: string;
    rtArrTime?: string;
    rtArrDate?: string;
    rtTrack?: string;
}