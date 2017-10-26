import {NextFunction, Response, Request, Router } from "express";
import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosStatic} from 'axios';
const BASE_URL = 'https://xmlopen.rejseplanen.dk/bin/rest.exe';
const ROUTE_DEFINITIONS = {
    location: {
        path: 'location',
        queryParams: {
            input: ''
        }
    },
    nearby: {
        path: 'stopsNearby',
        queryParams: {
            coordX: 0,
            coordY: 0,
            maxRadius: 1000,
            maxNumber: 30
        }
    }
};
const DEFAULT_QUERYPARAMETERS = {
    format: 'json'
};

export class Api {
    private _axiosInstanceConfig: AxiosRequestConfig = {
        baseURL: BASE_URL
    };

    private _axios: AxiosInstance = axios.create(this._axiosInstanceConfig);
    private _router: Router = Router();

    public get routes() {
        return this._router;
    }

    constructor() {
        this.configure();
    }

    public async location(req: Request, res: Response, next: NextFunction) {
        console.log('async location :D');
        const axiosReqParams = Object.assign({}, ROUTE_DEFINITIONS.location.queryParams, req.query);
        const axiosResponse = await this.axiosRequest('/location', 'get', axiosReqParams);

        res.json(axiosResponse.data);
    }

    private configure() {
        this._router.get('/location', this.asyncMiddleware, this.location);
    }

    private axiosRequest(url: string, method: string, params: {[key: string]: string}): AxiosPromise {
        console.log('el request builder!', url, method, params);
        return this._axios.request({
            url: url,
            method: method,
            params: Object.assign({}, params, DEFAULT_QUERYPARAMETERS)
        });
    }

    private mergeRequestParameters (routeSpecificParameters: {[key: string]: any}, requestParameters: {[key: string]: any}, globalParameters: {[key: string]: any}) {
        let reqParams = Object.assign({}, routeSpecificParameters, globalParameters);
        Object.keys(requestParameters).forEach((k: string) => {
            if(reqParams.hasOwnProperty(k)) {
                reqParams[k] = requestParameters[k];
            }
        });

        return reqParams;
    }

    private asyncMiddleware(req: Request, res: Response, next: NextFunction) {
        return (req: any, res: any, next: any) => {
            console.log('asyncMiddleware', req.method, req.url);
            Promise.resolve(this.asyncMiddleware(req, res, next)).catch(next);
        }
    }
}
