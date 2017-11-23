import {NgModule} from "@angular/core";
import {CommonModule} from "./common.module";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [

  ]
})
export class CommonBrowserModule {
  constructor() {
    console.log('commonbrowsermodule...');
  }
}
