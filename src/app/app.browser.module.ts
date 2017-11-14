import { NgModule } from '@angular/core';
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";
import {BrowserTransferStateModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') :[],
    BrowserTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {

}
