import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazierRoutingModule } from './lazier-routing.module';
import { LazierComponent } from './lazier.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    LazierRoutingModule,
    SharedModule
  ],
  declarations: [LazierComponent],
  exports: [LazierComponent]
})
export class LazierModule { }
