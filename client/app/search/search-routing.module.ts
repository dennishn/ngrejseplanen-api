import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocationComponent} from './location/location.component';
import {SearchContainerComponent} from './container/search.component';
import {LocationResolverService} from './location-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SearchContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'location'
      },
      {
        path: 'location',
        component: LocationComponent,
        resolve: {
          result: LocationResolverService
        }
      }
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
