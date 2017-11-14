import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: 'app/lazy/lazy.module#LazyModule'
  },
  {
    path: 'lazier',
    loadChildren: 'app/lazier/lazier.module#LazierModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
