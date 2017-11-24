import { NgModule } from '@angular/core';
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AppModule,
    ServiceWorkerModule.register('/ngsw-worker.js')
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {
  constructor() {

  }
}
