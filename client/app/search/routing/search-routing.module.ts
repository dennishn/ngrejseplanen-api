import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromComponents from '../components';
import * as fromContainers from '../containers';
import * as fromResolvers from './resolvers';

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
    fromResolvers.LocationResolverService
  ]
})
export class SearchRoutingModule { }
