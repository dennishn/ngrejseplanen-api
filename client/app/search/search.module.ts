import {NgModule} from '@angular/core';

import {SearchRoutingModule} from './routing/search-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AppMaterialModule} from '../shared/material.module';
import {SearchState} from "./state/search-state.service";

import * as fromComponents from './components';
import * as fromContainers from './containers';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
    imports: [
        SharedModule,
        AppMaterialModule,
        SearchRoutingModule
    ],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.components
    ],
    providers: [
        SearchState
    ]
})
export class SearchModule {
}
