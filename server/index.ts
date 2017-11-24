import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Server} from './server';
import {Request, Response} from 'express';
import * as angularUniversal from "./universal";
import {provideModuleMap} from "@nguniversal/module-map-ngfactory-loader";
const {LAZY_MODULE_MAP} = require(__dirname + '/main.bundle');

admin.initializeApp(functions.config().firebase);

const server = new Server();

export const api = functions.https.onRequest(server.app);

export const app = angularUniversal.trigger({
  index: __dirname + '/index.html',
  main: __dirname + '/main.bundle',
  enableProdMode: true,
  cdnCacheExpiry: 43200, // 12 hrs
  browserCacheExpiry: 3600, // 1 hr
  extraProviders: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
});
