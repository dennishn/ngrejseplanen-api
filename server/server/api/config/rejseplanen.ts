import {IQueryParameter, IRouteConfig} from './api';

interface IRejseplanenConfig {
    baseUrl: string;
    baseQueryParameters: IQueryParameter;
    routes: IRouteConfig;
}

export const RejseplanenConfig: IRejseplanenConfig = {
    baseUrl: 'https://xmlopen.rejseplanen.dk/bin/rest.exe',
    baseQueryParameters: {
        format: 'json'
    },
    routes: {
        location: {
            path: '/location',
            queryParams: {
                input: null
            }
        },
        nearby: {
            path: '/stopsNearby',
            queryParams: {
                coordX: 0,
                coordY: 0,
                maxRadius: 1000,
                maxNumber: 30
            }
        },
        departureBoards: {
            path: '/multiDepartureBoard',
            queryParams: {
                id1: null,
                id2: null,
                id3: null,
                id4: null,
                id5: null,
                id6: null,
                id7: null,
                id8: null,
                id9: null,
                id10: null,
                date: null,
                time: null,
                offsetTime: null,
                useTog: 1,
                useBus: 1,
                useMetro: 1
            }
        },
        departureBoard: {
            path: '/departureBoard',
            queryParams: {
                date: null,
                time: null,
                offsetTime: null
            }
        },
        journeyDetail: {
            path: '/journeyDetail',
            queryParams: {
                ref: null
            }
        }
    }
};