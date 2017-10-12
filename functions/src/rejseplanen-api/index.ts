import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import {Request, Response} from 'express';
import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';

const BASE_URL = 'https://xmlopen.rejseplanen.dk/bin/rest.exe';

const ENDPOINTS = {
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

const BASE_QUERYPARAMETERS = {
    format: 'json'
};

const apiApp = express();
apiApp.use(cors());

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

apiApp.get('/location', (req: Request, res: Response) => {
    console.time(`GET: ${req.originalUrl}`);

    if (!req.path) {
        // prepend to keep query, path params
        req.url = `/${req.url}`
    }

    const axiosRequestConfig: AxiosRequestConfig = {
        params: mergeRequestParameters(ENDPOINTS.location.queryParams, req.query, BASE_QUERYPARAMETERS)
    };

    axiosInstance.get(ENDPOINTS.location.path, axiosRequestConfig)
        .then((r: AxiosResponse) => {
            console.timeEnd(`GET: ${req.originalUrl}`);
            res.json(r.data);
        })
        .catch((e) => console.warn(e));
});

apiApp.get('/nearby', (req: Request, res: Response) => {
    console.time(`GET: ${req.originalUrl}`);

    if (!req.path) {
        // prepend to keep query, path params
        req.url = `/${req.url}`
    }

    const axiosRequestConfig: AxiosRequestConfig = {
        params: mergeRequestParameters(ENDPOINTS.nearby.queryParams, req.query, BASE_QUERYPARAMETERS)
    };

    axiosInstance.get(ENDPOINTS.nearby.path, axiosRequestConfig)
        .then((r: AxiosResponse) => {
            console.timeEnd(`GET: ${req.originalUrl}`);
            res.json(r.data);
        })
        .catch((e) => console.warn(e));
});

const mergeRequestParameters = (routeSpecificParameters: {[key: string]: any}, requestParameters: {[key: string]: any}, globalParameters: {[key: string]: any}) => {
    let reqParams = Object.assign({}, routeSpecificParameters, globalParameters);
    Object.keys(requestParameters).forEach((k: string) => {
        if(reqParams.hasOwnProperty(k)) {
            reqParams[k] = requestParameters[k];
        }
    });

    return reqParams;
};

export const listener = functions.https.onRequest(apiApp);