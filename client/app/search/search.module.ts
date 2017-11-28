import { NgModule } from '@angular/core';

import { SearchRoutingModule } from './search-routing.module';
import { SearchContainerComponent} from './container/search.component';
import {SharedModule} from '../shared/shared.module';
import { LocationComponent } from './location/location.component';
import {AppMaterialModule} from '../shared/material.module';
import {ResultsComponent} from "./results/results.component";

@NgModule({
  imports: [
    SharedModule,
    AppMaterialModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchContainerComponent,
    LocationComponent,
    ResultsComponent
  ]
})
export class SearchModule { }