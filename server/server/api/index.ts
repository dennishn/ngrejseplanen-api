import {NextFunction, Response, Request, Router } from "express";
import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosTransformer} from 'axios';
import * as cors from 'cors';
import * as winston from 'winston';
import {RejseplanenConfig} from './config/rejseplanen';
import {IQueryParameter} from './config/api';
import {locationTransformer} from './transformers/location';
import {nearbyTransformer} from './transformers/nearby';
import {departureBoardsTransformer} from './transformers/departure-boards';
import {departureBoardTransformer} from './transformers/departure-board';
import {journeyDetailTransformer} from './transformers/journey-detail';

export class Api {
    private _axiosInstanceConfig: AxiosRequestConfig = {
        baseURL: RejseplanenConfig.baseUrl
    };

    private _corsOptions: cors.CorsOptions = {
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS',
        origin: true,
        preflightContinue: false
    };

    private _axios: AxiosInstance = axios.create(this._axiosInstanceConfig);
    private _router: Router = Router();

    public get routes() {
        return this._router;
    }

    constructor() {
        this.configure();
    }

    private location = async (req: Request, res: Response, next: NextFunction) => {
        const axiosReqParams = Object.assign({}, RejseplanenConfig.routes.location.queryParams, req.query);

        try {
            const axiosResponse = await this.axiosRequest(
                RejseplanenConfig.routes.location.path,
                'get',
                axiosReqParams,
                locationTransformer
            );

            res.json(axiosResponse.data);
            next();
        }
        catch(err) {
            next(err);
        }
    };

    private nearby = async (req: Request, res: Response, next: NextFunction) => {
        const axiosReqParams = Object.assign({}, RejseplanenConfig.routes.nearby.queryParams, req.query);
        const axiosResponse = await this.axiosRequest(
            RejseplanenConfig.routes.nearby.path,
            'get',
            axiosReqParams,
            nearbyTransformer
        );

        res.json(axiosResponse.data);
        next();
    };

    private departureBoards = async (req: Request, res: Response, next: NextFunction) => {
        const axiosReqParams = Object.assign({}, RejseplanenConfig.routes.departureBoards.queryParams, req.query);
        const axiosResponse = await this.axiosRequest(
            RejseplanenConfig.routes.departureBoards.path,
            'get',
            axiosReqParams,
            departureBoardsTransformer
        );

        res.json(axiosResponse.data);
        next();
    };

    private departureBoard = async (req: Request, res: Response, next: NextFunction) => {
        const axiosReqParams = Object.assign({id: req.params.id}, RejseplanenConfig.routes.departureBoard.queryParams, req.query);
        const axiosResponse = await this.axiosRequest(
            RejseplanenConfig.routes.departureBoard.path,
            'get',
            axiosReqParams,
            departureBoardTransformer
        );

        res.json(axiosResponse.data);
        next();
    };

    private arrivalBoard = async (req: Request, res: Response, next: NextFunction) => {
        // TODO
    };

    private journeyDetail = async (req: Request, res: Response, next: NextFunction) => {
        const axiosReqParams = Object.assign({}, RejseplanenConfig.routes.journeyDetail.queryParams, req.query);
        const axiosResponse = await this.axiosRequest(
            RejseplanenConfig.routes.journeyDetail.path,
            'get',
            axiosReqParams,
            journeyDetailTransformer
        );

        res.json(axiosResponse.data);
        next();
    };

    private configure() {
        this._router.use(cors(this._corsOptions));

        this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send('Welcome to NG Rejseplanen API');
            next();
        });

        this._router.get('/location', this.beforeAxiosRequest, this.location, this.afterAxiosRequest);
        this._router.get('/nearby', this.beforeAxiosRequest, this.nearby, this.afterAxiosRequest);
        this._router.get('/boards', this.beforeAxiosRequest, this.departureBoards, this.afterAxiosRequest);
        this._router.get('/boards/:id', this.beforeAxiosRequest, this.departureBoard, this.afterAxiosRequest);
        this._router.get('/journey', this.beforeAxiosRequest, this.journeyDetail, this.afterAxiosRequest);
    }

    private axiosRequest(url: string, method: string, params: IQueryParameter, transformer?: AxiosTransformer): AxiosPromise {

        const transformers = [].concat(axios.defaults.transformResponse);
        if(transformer) {
            transformers.push(transformer);
        }

        const axiosRequestConfig: AxiosRequestConfig = {
            url: url,
            method: method,
            params: Object.assign({}, params, RejseplanenConfig.baseQueryParameters),
            transformResponse: transformers
        };

        return this._axios.request(axiosRequestConfig);
    }

    private beforeAxiosRequest = (req: Request, res: Response, next: NextFunction) => {
        next();
    };
    private afterAxiosRequest = (req: Request, res: Response, next: NextFunction) => {
        next();
    };
}
