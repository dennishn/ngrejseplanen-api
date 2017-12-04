import {NgModule} from "@angular/core";
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatListModule, MatSnackBarModule
} from "@angular/material";

const MODULES = [
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class AppMaterialModule {}
