import { NgModule } from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';

import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  imports: [
    NoopAnimationsModule,
    ServerModule,
    AppModule,
    ServerTransferStateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppServerModule {

}
