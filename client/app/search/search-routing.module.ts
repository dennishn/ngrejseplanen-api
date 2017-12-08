import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocationComponent} from './location/location.component';
import {LocationResolverService} from './location-resolver.service';
import {ResultsComponent} from "../shared/results/results.component";

import * as fromComponents from './components';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.SearchContainerComponent,
    children: [
      {
        path: '',
        component: fromComponents.SearchFormComponent
        // pathMatch: 'full',
        // redirectTo: 'location'
      },
      // {
      //   path: 'location',
      //   component: LocationComponent,
      //   runGuardsAndResolvers: 'paramsOrQueryParamsChange',
      //   // resolve: {
      //   //   results: LocationResolverService
      //   // }
      // },
      /*{
        path: 'results',
        component: ResultsComponent,
        resolve: {
          results: LocationResolverService
        }
      }
      */
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    LocationResolverService
  ]
})
export class SearchRoutingModule { }
