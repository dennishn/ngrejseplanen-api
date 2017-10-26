import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {Server} from './server';
import {Request, Response} from 'express';

// admin.initializeApp(functions.config().firebase);

const server = new Server();

export const app = functions.https.onRequest(server.app);