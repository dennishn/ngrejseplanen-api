import {NgModule, Optional, SkipSelf} from "@angular/core";
import {CoreModule} from "./core.module";

@NgModule({
  imports: [
    CoreModule
  ]
})
export class CoreBrowserModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreBrowserModule) {
    if (parentModule) {
      throw new Error(
        'CoreBrowserModule is already loaded. Import it in the AppModule only');
    }
  }
}
