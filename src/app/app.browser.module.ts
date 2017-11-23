import { NgModule } from '@angular/core';
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {CommonBrowserModule} from "./common/common.browser.module";
import {AppServiceWorkerModule} from "./service-worker/service-worker.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    ServiceWorkerModule.register('/ngsw-worker.js'),
    CommonBrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {
  constructor() {

  }
}
