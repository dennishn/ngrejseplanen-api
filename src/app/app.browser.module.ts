import { NgModule } from '@angular/core';
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {AppServiceWorkerModule} from "./service-worker/service-worker.module";
import {SharedBrowserModule} from "./shared/shared.browser.module";
import {CoreBrowserModule} from "./core/core.browser.module";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    ServiceWorkerModule.register('/ngsw-worker.js'),
    SharedBrowserModule,
    CoreBrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {
  constructor() {

  }
}
