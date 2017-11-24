export interface IQueryParameter {
    [key: string]: string | number | boolean;
}

export interface IRouteConfig {
    [key: string]: {
        path: string;
        queryParams: IQueryParameter
    }
}

export const API_VERSION = '1';