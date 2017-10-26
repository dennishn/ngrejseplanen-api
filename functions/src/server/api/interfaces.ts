export interface QueryParameterDefinitions {
    [key: string]: string | number;
}
export interface RouteDefinitions {
    [key: string]: {
        path: string,
        queryParams: QueryParameterDefinitions
    }
}