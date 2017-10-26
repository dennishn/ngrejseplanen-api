import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import errorHandler = require('errorhandler');
// TODO: How to properly Axios it...
import axios, {AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Api} from './api/api';
import {NextFunction} from 'express';

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

const REQUEST_METHODS = {
    get: 'get'
};

export class Server {
    private _corsOptions: cors.CorsOptions = {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS',
        origin: true,
        preflightContinue: false
    }
    
    private _app: express.Application = express();
    private _api: Api = new Api();
    private _router: express.Router = express.Router();
    
    public get app(): express.Application {
        return this._app;
    }

    constructor() {
        this.configureServer();
        this.configureApi();
    }

    private configureApi() {

        this._router.use(cors(this._corsOptions));

        // router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //     res.json({message: 'Welcome to the NG Rejseplanen API (middleware)'});
        //     next();
        // });
        // // router.get('/location', this.ngRejseplanenInstance.location);
        // router.get('/location', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //     return this.api.location(req, res, next);
        // });

        // RejseplanenApi.create(router);

        // wire up the REST API


        // enable CORS pre-flight
        this._router.options("/api", cors(this._corsOptions));
        console.log(this._api, this._api.routes);
        this._app.use("/api", this._api.routes);
    }

    private configureServer() {
        // mount logger
        this._app.use(logger('dev'));

        // mount query string parser
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));

        // catch 404 and forward to error handler
        this._app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    private asyncMiddleware(req: Request, res: Response, next: NextFunction) {
        return (req: any, res: any, next: any) => {
            Promise.resolve(this.asyncMiddleware(req, res, next)).catch(next);
        }
    }
}

// const apiApp: express.Application = express();
// const apiRouter: express.Router = express.Router();
//
// apiApp.use(cors());
//
//
// const axiosInstance = axios.create({
//     baseURL: BASE_URL
// });
//
// apiApp.get('/location', rr);
// // apiApp.get('/location', (req: express.Request, res: express.Response) => {
// //     console.time(`GET: ${req.originalUrl}`);
// //
// //     if (!req.path) {
// //         // prepend to keep query, path params
// //         req.url = `/${req.url}`
// //     }
// //
// //     const axiosRequestConfig: AxiosRequestConfig = {
// //         params: mergeRequestParameters(ENDPOINTS.location.queryParams, req.query, BASE_QUERYPARAMETERS)
// //     };
// //
// //     axiosInstance.get(ENDPOINTS.location.path, axiosRequestConfig)
// //         .then((r: AxiosResponse) => {
// //             console.timeEnd(`GET: ${req.originalUrl}`);
// //             res.json(r.data);
// //         })
// //         .catch((e) => console.warn(e));
// // });
//
// apiApp.get('/nearby', (req: express.Request, res: express.Response) => {
//     console.time(`GET: ${req.originalUrl}`);
//
//     if (!req.path) {
//         // prepend to keep query, path params
//         req.url = `/${req.url}`
//     }
//
//     const axiosRequestConfig: AxiosRequestConfig = {
//         params: mergeRequestParameters(ENDPOINTS.nearby.queryParams, req.query, BASE_QUERYPARAMETERS)
//     };
//
//     axiosInstance.get(ENDPOINTS.nearby.path, axiosRequestConfig)
//         .then((r: AxiosResponse) => {
//             console.timeEnd(`GET: ${req.originalUrl}`);
//             res.json(r.data);
//         })
//         .catch((e) => console.warn(e));
// });
//
// function rr(req: express.Request, res: express.Response): express.RequestHandler {
//     console.log('YOo');
//     return (req, res) => {
//         const url: string = req.path;
//         const method: string = req.method;
//         console.log('WORD', url, method);
//
//         console.time(`GET: ${req.originalUrl}`);
//
//         if (!req.path) {
//             // prepend to keep query, path params
//             req.url = `/${req.url}`
//         }
//
//         axiosInstance.request({
//             url: url,
//             method: method
//         }).then((r) => {
//             console.timeEnd(`GET: ${req.originalUrl}`);
//             res.json(r.data);
//         });
//     }
//
// };
// const axiosRequest = (url: string, method: string, config?: AxiosRequestConfig): AxiosPromise<AxiosResponse> => {
//
// };

const mergeRequestParameters = (routeSpecificParameters: {[key: string]: any}, requestParameters: {[key: string]: any}, globalParameters: {[key: string]: any}) => {
    let reqParams = Object.assign({}, routeSpecificParameters, globalParameters);
    Object.keys(requestParameters).forEach((k: string) => {
        if(reqParams.hasOwnProperty(k)) {
            reqParams[k] = requestParameters[k];
        }
    });

    return reqParams;
};

// export const listener = functions.https.onRequest(apiApp);