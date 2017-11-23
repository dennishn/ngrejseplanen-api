import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ServiceWorkerModule} from '@angular/service-worker';
import {SwUpdateService} from "./service-worker/sw-update.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'nguniversal'}),
    AppRoutingModule,
    HttpClientModule,
    BrowserTransferStateModule,
    ServiceWorkerModule
  ],
  providers: [
    SwUpdateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
