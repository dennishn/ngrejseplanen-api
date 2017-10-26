import {QueryParameterDefinitions} from './api/interfaces';

export const mergeRequestParameters = (routeSpecificParameters: QueryParameterDefinitions, requestParameters: QueryParameterDefinitions, globalParameters: QueryParameterDefinitions): QueryParameterDefinitions => {
    let reqParams = Object.assign({}, routeSpecificParameters, globalParameters);
    Object.keys(requestParameters).forEach((k: string) => {
        if(reqParams.hasOwnProperty(k)) {
            reqParams[k] = requestParameters[k];
        }
    });

    return reqParams;
};