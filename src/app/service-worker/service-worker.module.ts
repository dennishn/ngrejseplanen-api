import {NgModule} from "@angular/core";
import {SwUpdateService} from "./sw-update.service";
import {ServiceWorkerModule} from "@angular/service-worker";

@NgModule({
  imports: [
    ServiceWorkerModule
  ],
  providers: [
    SwUpdateService
  ]
})
export class AppServiceWorkerModule {}
