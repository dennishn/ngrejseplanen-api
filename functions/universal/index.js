"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const universal_1 = require("./universal");
exports.trigger = (config) => {
    return functions.https.onRequest(createExpressApp(config));
};
function createExpressApp(config) {
    const router = express();
    /**
     * An express static directory is not usually neccessary when
     * in use with Firebase Hosting. Hosting will always prefer
     * existing static assets to dynamic routes.
     */
    if (valueExists(config.staticDirectory)) {
        router.use(express.static(config.staticDirectory));
    }
    const cacheControlValue = getCacheControlHeader(config);
    // middleware that applies a Cache-Control header to each dynamic response
    router.use((req, res, next) => {
        res.set('Cache-Control', cacheControlValue);
        next();
    });
    router.get('/*', universal_1.angularUniversal(config));
    return router;
}
function valueExists(value) {
    return !(typeof value === 'undefined' || value === null);
}
function checkCacheControlValue(config) {
    let cdnCacheExpiry = 0;
    let browserCacheExpiry = 0;
    let staleWhileRevalidate = 0;
    if (valueExists(config.cdnCacheExpiry)) {
        cdnCacheExpiry = config.cdnCacheExpiry;
    }
    if (valueExists(config.browserCacheExpiry)) {
        browserCacheExpiry = config.browserCacheExpiry;
    }
    if (valueExists(config.staleWhileRevalidate)) {
        staleWhileRevalidate = config.staleWhileRevalidate;
    }
    return { cdnCacheExpiry, browserCacheExpiry, staleWhileRevalidate };
}
function getCacheControlHeader(config) {
    const { cdnCacheExpiry, browserCacheExpiry, staleWhileRevalidate } = checkCacheControlValue(config);
    return `public, max-age=${browserCacheExpiry}, s-maxage=${cdnCacheExpiry}, stale-while-revalidate=${staleWhileRevalidate}`;
}
