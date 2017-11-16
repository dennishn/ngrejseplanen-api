"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
const core_1 = require("@angular/core");
const platform_server_1 = require("@angular/platform-server");
const fs = require("fs");
const rxjs_1 = require("rxjs");
function readFile$(file) {
    return rxjs_1.Observable.create((observer) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                observer.error(err);
            }
            else {
                observer.next(data);
                observer.complete();
            }
        });
    });
}
function angularUniversal({ index, main, staticDirectory, enableProdMode = false, extraProviders }) {
    if (enableProdMode) {
        core_1.enableProdMode();
    }
    return (req, res) => {
        readFile$(index)
            .mergeMap(document => {
            const url = req.path;
            const AppServerModuleNgFactory = require(main).AppServerModuleNgFactory;
            return rxjs_1.Observable.from(platform_server_1.renderModuleFactory(AppServerModuleNgFactory, { document, url, extraProviders: extraProviders }));
        })
            .take(1)
            .subscribe(html => { res.send(html); });
    };
}
exports.angularUniversal = angularUniversal;
