import {NgModule} from "@angular/core";
import {
    MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatListModule, MatSnackBarModule, MatTabsModule, MatToolbarModule
} from "@angular/material";

const MODULES = [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
];

@NgModule({
    imports: MODULES,
    exports: MODULES
})
export class AppMaterialModule {
}
