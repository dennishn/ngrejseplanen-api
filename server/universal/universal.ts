import 'zone.js/dist/zone-node';
import * as express from 'express';
import { enableProdMode as enableProd, StaticProvider } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import * as fs from 'fs';
import { Observable, Observer } from 'rxjs';

export interface ServerConfiguration {
  main: string;
  index: string;
  enableProdMode?: boolean;
  staticDirectory?: string;
  extraProviders?: StaticProvider[];
}

function readFile$(file: string): Observable<string> {
  return Observable.create((observer: Observer<string>) => {
    fs.readFile(file, 'utf8', (err: any, data: any) => {
      if(err) {
        observer.error(err);
      } else {
        observer.next(data);
        observer.complete();
      }
    });
  });
}

export function angularUniversal({ index, main, staticDirectory, enableProdMode = false, extraProviders }: ServerConfiguration) {
  if (enableProdMode) { enableProd(); }
  return (req: express.Request, res: express.Response) => {
    readFile$(index)
      .mergeMap(document => {
        const url = req.originalUrl;
        const AppServerModuleNgFactory = require(main).AppServerModuleNgFactory;
        return Observable.from(renderModuleFactory(AppServerModuleNgFactory, { document, url, extraProviders: extraProviders }))
      })
      .take(1)
      .subscribe(html => { res.send(html); });
  };
}
