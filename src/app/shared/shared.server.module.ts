import {NgModule} from "@angular/core";
import {SharedModule} from "./shared.module";

@NgModule({
  imports: [
    SharedModule
  ]
})
export class SharedServerModule {
  constructor() {
    console.log('shared server module says hi');
  }
}
