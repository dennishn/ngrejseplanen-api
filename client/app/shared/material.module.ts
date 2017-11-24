import {NgModule} from "@angular/core";
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule
} from "@angular/material";

const MODULES = [
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatListModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class AppMaterialModule {}
