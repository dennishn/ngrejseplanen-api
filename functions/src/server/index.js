"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const compression = require("compression");
const winston = require("winston");
const api_1 = require("./api");
const api_2 = require("./api/config/api");
class Server {
    constructor() {
        this._app = express();
        this._api = new api_1.Api();
        winston.log('info', 'NG Rejseplanen Express Server');
        this.configureApi();
        this.configureServer();
    }
    get app() {
        return this._app;
    }
    configureApi() {
        this._app.use(`/v${api_2.API_VERSION}`, this._api.routes);
    }
    configureServer() {
        // mount logger
        this._app.use(logger('dev'));
        this._app.use(compression());
        // mount query string parser
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));
    }
}
exports.Server = Server;
