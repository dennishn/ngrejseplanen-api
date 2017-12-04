import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {ResultsComponent} from "./results/results.component";

const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule
];

const SHARED_COMPONENTS = [
  ResultsComponent
];

@NgModule({
  imports: [...SHARED_MODULES],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS]
})
export class SharedModule {
  constructor() {

  }
}
