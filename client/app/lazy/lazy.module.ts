import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazyComponent } from './lazy.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    LazyRoutingModule,
    SharedModule
  ],
  declarations: [LazyComponent],
  exports: [LazyComponent]
})
export class LazyModule { }
