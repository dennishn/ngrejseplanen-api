import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";


@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule {

}
