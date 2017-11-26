import {map} from 'rxjs/operators';
import {take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {ApiLocationResponse} from '../core/data/rejseplanen/responses/location';
import {RejseplanenService} from '../core/data/rejseplanen/rejseplanen.service';

@Injectable()
export class LocationResolverService implements Resolve<ApiLocationResponse> {

  constructor(
    private rejseplanen: RejseplanenService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiLocationResponse> {
    let searchTerm = route.paramMap.get('location');

    return this.rejseplanen.getLocation(searchTerm)
      .pipe(
        take(1),
        map((response: ApiLocationResponse) => {
          if(response) {
            return response;
          } else {
            this.router.navigate(['/search']);
            return null;
          }
        })
      );
  }
}
