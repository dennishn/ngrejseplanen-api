"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const server_1 = require("./server");
const angularUniversal = require("../node_modules/angular-universal-express-firebase/src");
const { LAZY_MODULE_MAP } = require('../main.bundle.js');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
// import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
admin.initializeApp(functions.config().firebase);
const server = new server_1.Server();
exports.api = functions.https.onRequest(server.app);
exports.app = angularUniversal.trigger({
    index: __dirname + '/index.html',
    main: __dirname + '/main.bundle',
    enableProdMode: true,
    cdnCacheExpiry: 43200,
    browserCacheExpiry: 3600,
    extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
});
