import {NgModule} from "@angular/core";
import {CommonModule} from "./common.module";
import {SwUpdateService} from "./service-worker/sw-update.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SwUpdateService
  ]
})
export class CommonBrowserModule {
  constructor(private swUpdateService: SwUpdateService) {
    console.log('commonbrowsermodule...');
  }
}
