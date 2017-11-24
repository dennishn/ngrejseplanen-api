export interface ApiStop {
    name: string;
    x: number;
    y: number;
    // Optional
    routeIdx?: string;
    depDate?: string;
    // depTime?: string;
    // depDate?: string;
    arrDate?: string;
    // arrTime?: string;
    // arrDate?: string;
    track?: string;
    rtDepDate?: string;
    // rtDepTime?: string;
    // rtDepDate?: string;
    rtArrDate?: string;
    // rtArrTime?: string;
    // rtArrDate?: string;
    rtTrack?: string;
}