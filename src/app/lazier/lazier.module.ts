import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazierRoutingModule } from './lazier-routing.module';
import { LazierComponent } from './lazier.component';

@NgModule({
  imports: [
    CommonModule,
    LazierRoutingModule
  ],
  declarations: [LazierComponent],
  exports: [LazierComponent]
})
export class LazierModule { }
