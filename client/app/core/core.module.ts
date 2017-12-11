import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SelectivePreloadingStrategy} from "./routing/selective-preloading-strategy";
import {RejseplanenModule} from "./data/rejseplanen/rejseplanen.module";
import {StateService} from './state/state.service';
import {ErrorInterceptor} from "./http/error-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        // App
        RejseplanenModule
    ],
    providers: [
        SelectivePreloadingStrategy,
        StateService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    exports: [
        RejseplanenModule
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
