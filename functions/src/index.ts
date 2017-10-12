import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as RejseplanenApi from './rejseplanen-api';

admin.initializeApp(functions.config().firebase);

export const rpApi = RejseplanenApi.listener;