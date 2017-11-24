import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [

  ]
})
export class SharedBrowserModule {
  constructor() {
    console.log('sharedbrowsermodule...');
  }
}
