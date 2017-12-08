import {take, map, catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
import {ApiLocationResponse} from '../core/data/rejseplanen/responses/location';
import {RejseplanenService} from '../core/data/rejseplanen/rejseplanen.service';
import {makeStateKey, Meta, Title, TransferState} from "@angular/platform-browser";

const LOCATION_STATE = makeStateKey('city-weather-resolver.results');

@Injectable()
export class LocationResolverService implements Resolve<ApiLocationResponse> {

  private result: ApiLocationResponse;

  constructor(
    private rejseplanen: RejseplanenService,
    private router: Router,
    private transferState: TransferState,
    private title: Title,
    private meta: Meta
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiLocationResponse> {
    const searchTerm = route.queryParamMap.get('location');

    // Nothing to resolve without a query
    if(!searchTerm) {
      return;
    }

    this.title.setTitle(`Resultater for ${searchTerm}`);

    const found = this.transferState.hasKey(LOCATION_STATE);

    if(found) {
      const res = of(this.transferState.get<ApiLocationResponse>(LOCATION_STATE, null));
      this.transferState.remove(LOCATION_STATE);
      return res;
    } else {
      this.transferState.onSerialize(LOCATION_STATE, () => this.result);
      return this.rejseplanen.getLocation(searchTerm).pipe(
        tap(result => this.result = result)
      );
    }
  }
}
