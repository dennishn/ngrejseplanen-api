import {take, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {ApiLocationResponse} from '../core/data/rejseplanen/responses/location';
import {RejseplanenService} from '../core/data/rejseplanen/rejseplanen.service';
import {makeStateKey, TransferState} from "@angular/platform-browser";

const LOCATION_STATE = makeStateKey('city-weather-resolver.results');

@Injectable()
export class LocationResolverService implements Resolve<ApiLocationResponse> {

  private results: ApiLocationResponse;

  constructor(
    private rejseplanen: RejseplanenService,
    private router: Router,
    private transferState: TransferState
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiLocationResponse> {
    const searchTerm = route.queryParamMap.get('location');
    console.warn('searchTerm', searchTerm)
    const stateData = this.transferState.hasKey(LOCATION_STATE);
    console.log('found in state?', stateData);
    if(stateData) {
      const response = of(
        this.transferState.get<ApiLocationResponse>(
          LOCATION_STATE,
          {
            data: {
              stopLocation: [],
              coordLocation: []
            }
          }
        )
      );
      this.transferState.remove(LOCATION_STATE);
      return response;
    } else {
      this.transferState.onSerialize(LOCATION_STATE, () => this.results);
      return this.rejseplanen.getLocation(searchTerm).pipe(
        take(1),
        map((response: ApiLocationResponse) => {
          console.warn('can we act', response)
          if(response) {
            console.log('should set state');
            this.transferState.set(LOCATION_STATE, response as null);
            return response;
          } else {
            console.log('no remote data response!');
            //this.router.navigate(['/search']);
            return {
              data: {
                stopLocation: [],
                coordLocation: []
              }
            };
          }
        }),
        catchError(e => {
          console.warn('error ', e);
          return of({
            data: {
              stopLocation: [],
              coordLocation: []
            }
          });
        })
      )
    }
  }
}
