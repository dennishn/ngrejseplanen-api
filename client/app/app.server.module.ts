import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";
import {ServiceWorkerModuleMock} from "./mocks/service-worker/service-worker.mock.module";

@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    ServiceWorkerModuleMock
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule {

}
