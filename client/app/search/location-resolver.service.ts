import {map} from 'rxjs/operators';
import {take} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {ApiLocationResponse} from '../core/data/rejseplanen/responses/location';
import {RejseplanenService} from '../core/data/rejseplanen/rejseplanen.service';
import {makeStateKey, TransferState} from "@angular/platform-browser";

const LOCATION_STATE = makeStateKey('LOCATION_STATE');

@Injectable()
export class LocationResolverService implements Resolve<ApiLocationResponse> {

  private result: ApiLocationResponse;

  constructor(
    private rejseplanen: RejseplanenService,
    private router: Router,
    private transferState: TransferState
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ApiLocationResponse> {
    const searchTerm = route.paramMap.get('location');
    const stateData = this.transferState.hasKey(LOCATION_STATE);

    if(stateData) {
      const response = of(this.transferState.get<ApiLocationResponse>(LOCATION_STATE, null));
      this.transferState.remove(LOCATION_STATE);
      return response;
    } else {
      this.transferState.onSerialize(LOCATION_STATE, () => this.result);
      return this.rejseplanen.getLocation(searchTerm).pipe(
        take(1),
        map((response: ApiLocationResponse) => {
          if(response) {
            this.transferState.set(LOCATION_STATE, response);
            return response;
          } else {
            this.router.navigate(['/search']);
            return null;
          }
        })
      );
    }
  }
}
