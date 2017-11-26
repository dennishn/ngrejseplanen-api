import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SelectivePreloadingStrategy} from "./routing/selective-preloading-strategy";
import {RejseplanenModule} from "./data/rejseplanen/rejseplanen.module";
import { StateService } from './state/state.service';

@NgModule({
  imports: [
    // App
    RejseplanenModule
  ],
  providers: [
    SelectivePreloadingStrategy,
    StateService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
