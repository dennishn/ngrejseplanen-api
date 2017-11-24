import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SelectivePreloadingStrategy} from "./routing/selective-preloading-strategy";
import {RejseplanenModule} from "./data/rejseplanen/rejseplanen.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // App
    RejseplanenModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
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
