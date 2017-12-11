import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {StopLocationComponent} from './components/stop-location/stop-location.component';

import * as fromComponents from './components';
import {FlexLayoutModule} from "@angular/flex-layout";

const SHARED_MODULES: any[] = [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
];

const SHARED_COMPONENTS: any[] = [
    ...fromComponents.components
];

@NgModule({
    imports: [
        ...SHARED_MODULES
    ],
    declarations: [
        ...SHARED_COMPONENTS
    ],
    exports: [
        ...SHARED_MODULES,
        ...SHARED_COMPONENTS
    ]
})
export class SharedModule {
    constructor() {

    }
}
