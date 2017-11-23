import { NgModule } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { SwUpdateServerMock } from './swUpdate-server.mock.service';
import { SwPushServerMock } from './swPush-server.mock.service';
@NgModule({
  providers: [
    {provide: SwUpdate, useClass: SwUpdateServerMock },
    {provide: SwPush, useClass: SwPushServerMock }
  ]
})

export class ServiceWorkerModuleMock {
  constructor() {
    console.log(' hi from the mock master which mocks faster, and im a module ');
  }
}
