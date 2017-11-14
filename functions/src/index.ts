import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Server} from './server';
import {Request, Response} from 'express';
import * as angularUniversal from 'angular-universal-express-firebase';

admin.initializeApp(functions.config().firebase);

const server = new Server();

export const api = functions.https.onRequest(server.app);
export const app = angularUniversal.trigger({
  index: __dirname + '/index.html',
  main: __dirname + '/main.bundle',
  enableProdMode: true,
  cdnCacheExpiry: 43200, // 12hrs
  browserCacheExpiry: 3600 // 1 hr
});
