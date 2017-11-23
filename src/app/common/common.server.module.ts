import {NgModule} from "@angular/core";
import {CommonModule} from "./common.module";

@NgModule({
  imports: [
    CommonModule
  ]
})
export class CommonServerModule {
  constructor() {
    console.log('common server module says hi');
  }
}
