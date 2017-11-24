import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SelectivePreloadingStrategy} from "./core/routing/selective-preloading-strategy";

const routes: Routes = [
  {
    path: 'lazy',
    loadChildren: 'app/lazy/lazy.module#LazyModule'
  },
  {
    path: 'lazier',
    loadChildren: 'app/lazier/lazier.module#LazierModule',
    data: {
      preload: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
