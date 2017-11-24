import {NgModule, Optional, SkipSelf} from "@angular/core";
import {CoreModule} from "./core.module";

@NgModule({
  imports: [
    CoreModule
  ]
})
export class CoreServerModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreServerModule) {
    if (parentModule) {
      throw new Error(
        'CoreServerModule is already loaded. Import it in the AppModule only');
    }
  }
}
