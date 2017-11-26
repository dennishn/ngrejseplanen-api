"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = require("axios");
const cors = require("cors");
const rejseplanen_1 = require("./config/rejseplanen");
const location_1 = require("./transformers/location");
class Api {
    constructor() {
        this._axiosInstanceConfig = {
            baseURL: rejseplanen_1.RejseplanenConfig.baseUrl
        };
        this._corsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS',
            origin: true,
            preflightContinue: false
        };
        this._axios = axios_1.default.create(this._axiosInstanceConfig);
        this._router = express_1.Router();
        this.location = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const axiosReqParams = Object.assign({}, rejseplanen_1.RejseplanenConfig.routes.location.queryParams, req.query);
            try {
                const axiosResponse = yield this.axiosRequest(rejseplanen_1.RejseplanenConfig.routes.location.path, 'get', axiosReqParams, location_1.locationTransformer);
                res.json(axiosResponse.data);
                next();
            }
            catch (err) {
                next(err);
            }
        });
        this.nearby = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const axiosReqParams = Object.assign({}, rejseplanen_1.RejseplanenConfig.routes.nearby.queryParams, req.query);
            const axiosResponse = yield this.axiosRequest(rejseplanen_1.RejseplanenConfig.routes.nearby.path, 'get', axiosReqParams);
            res.json(axiosResponse.data);
            next();
        });
        this.departureBoards = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const axiosReqParams = Object.assign({}, rejseplanen_1.RejseplanenConfig.routes.departureBoards.queryParams, req.query);
            const axiosResponse = yield this.axiosRequest(rejseplanen_1.RejseplanenConfig.routes.departureBoards.path, 'get', axiosReqParams);
            res.json(axiosResponse.data);
            next();
        });
        this.departureBoard = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const axiosReqParams = Object.assign({ id: req.params.id }, rejseplanen_1.RejseplanenConfig.routes.departureBoard.queryParams, req.query);
            const axiosResponse = yield this.axiosRequest(rejseplanen_1.RejseplanenConfig.routes.departureBoard.path, 'get', axiosReqParams);
            res.json(axiosResponse.data);
            next();
        });
        this.arrivalBoard = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // TODO
        });
        this.journeyDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const axiosReqParams = Object.assign({}, rejseplanen_1.RejseplanenConfig.routes.journeyDetail.queryParams, req.query);
            const axiosResponse = yield this.axiosRequest(rejseplanen_1.RejseplanenConfig.routes.journeyDetail.path, 'get', axiosReqParams);
            res.json(axiosResponse.data);
            next();
        });
        this.beforeAxiosRequest = (req, res, next) => {
            next();
        };
        this.afterAxiosRequest = (req, res, next) => {
            next();
        };
        this.configure();
    }
    get routes() {
        return this._router;
    }
    configure() {
        this._router.use(cors(this._corsOptions));
        this._router.get('/', (req, res, next) => {
            res.send('Welcome to NG Rejseplanen API');
            next();
        });
        this._router.get('/location', this.beforeAxiosRequest, this.location, this.afterAxiosRequest);
        this._router.get('/nearby', this.beforeAxiosRequest, this.nearby, this.afterAxiosRequest);
        this._router.get('/boards', this.beforeAxiosRequest, this.departureBoards, this.afterAxiosRequest);
        this._router.get('/boards/:id', this.beforeAxiosRequest, this.departureBoard, this.afterAxiosRequest);
        this._router.get('/journey', this.beforeAxiosRequest, this.journeyDetail, this.afterAxiosRequest);
    }
    axiosRequest(url, method, params, transformer) {
        const transformers = [].concat(axios_1.default.defaults.transformResponse);
        if (transformer) {
            transformers.push(transformer);
        }
        const axiosRequestConfig = {
            url: url,
            method: method,
            params: Object.assign({}, params, rejseplanen_1.RejseplanenConfig.baseQueryParameters),
            transformResponse: transformers
        };
        return this._axios.request(axiosRequestConfig);
    }
}
exports.Api = Api;
