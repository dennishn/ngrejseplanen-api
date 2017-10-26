import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as winston from 'winston';
import errorHandler = require('errorhandler');
import {Api} from './api';
import {API_VERSION} from './api/config/api';

export class Server {
    private _app: express.Application = express();
    private _api: Api = new Api();
    
    public get app(): express.Application {
        return this._app;
    }

    constructor() {
        winston.log('info', 'NG Rejseplanen Express Server');
        this.configureServer();
        this.configureApi();
    }

    private configureApi(): void {
        this._app.use(`/api/v${API_VERSION}`, this._api.routes);
    }

    private configureServer(): void {
        // mount logger
        this._app.use(logger('dev'));

        // mount query string parser
        this._app.use(bodyParser.urlencoded({
            extended: true
        }));

        // catch 404 and forward to error handler
        this._app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            clearImmediate('min 404');
            err.status = 404;
            next(err);
        });

        this._app.use(compression());

        //error handling
        this._app.use(errorHandler());
    }
}