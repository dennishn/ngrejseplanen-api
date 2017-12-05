import { StaticProvider } from '@angular/core';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { angularUniversal, ServerConfiguration } from './universal';

export type Trigger = functions.TriggerAnnotated & ((req: Express.Request, resp: Express.Response) => void);

export interface FirebaseConfiguration extends ServerConfiguration {
  staticDirectory?: string;
  cdnCacheExpiry: number;
  browserCacheExpiry: number;
  staleWhileRevalidate?: number;
  extraProviders?: StaticProvider[]
}

export let trigger = (config: FirebaseConfiguration): Trigger => {
  return functions.https.onRequest(createExpressApp(config));
};

function createExpressApp(config: FirebaseConfiguration) {
  const router = express();
  /**
   * An express static directory is not usually neccessary when
   * in use with Firebase Hosting. Hosting will always prefer
   * existing static assets to dynamic routes.
   */
  if(valueExists(config.staticDirectory)) {
    router.use(express.static(config.staticDirectory!));
  }

  const cacheControlValue = getCacheControlHeader(config);

  router.use((req, res, next) => {
    console.log('Hello thingie...', req.path, req.query, req.url)
    if (!req.path) {
      // prepending "/" keeps query params, path params intact
      req.url = `/${req.url}`
    }
    console.log('Goodbye thingie...', req.path, req.query, req.url)
    next();
  });

  // middleware that applies a Cache-Control header to each dynamic response
  router.use((req, res, next) => {
    res.set('Cache-Control', cacheControlValue);
    next();
  });

  router.get('/*', angularUniversal(config));
  return router;
}

function valueExists(value?: any) {
  return !(typeof value === 'undefined' || value === null);
}

function checkCacheControlValue(config: FirebaseConfiguration) {
  let cdnCacheExpiry = 0
  let browserCacheExpiry = 0;
  let staleWhileRevalidate = 0;
  if(valueExists(config.cdnCacheExpiry)) {
    cdnCacheExpiry = config.cdnCacheExpiry;
  }
  if(valueExists(config.browserCacheExpiry)) {
    browserCacheExpiry = config.browserCacheExpiry;
  }
  if(valueExists(config.staleWhileRevalidate)) {
    staleWhileRevalidate = config.staleWhileRevalidate!;
  }
  return { cdnCacheExpiry, browserCacheExpiry, staleWhileRevalidate };
}

function getCacheControlHeader(config: FirebaseConfiguration) {
  const { cdnCacheExpiry, browserCacheExpiry, staleWhileRevalidate } = checkCacheControlValue(config);
  return `public, max-age=${browserCacheExpiry}, s-maxage=${cdnCacheExpiry}, stale-while-revalidate=${staleWhileRevalidate}`;
}
