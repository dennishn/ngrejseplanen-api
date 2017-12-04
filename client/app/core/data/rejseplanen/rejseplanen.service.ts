import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {ApiLocationResponse} from "./responses/location";
import {environment} from "../../../../environments/environment";
import {ApiDepartureBoardResponse} from "./responses/departure-board";
import {ApiJourneyDetailResponse} from "./responses/journey-detail";
import {catchError} from 'rxjs/operators/catchError';
import {of} from 'rxjs/observable/of';

const STATE_KEY = makeStateKey('rejseplanen');

@Injectable()
export class RejseplanenService {

  private developmentBaseUrl: string = 'http://localhost:5000/ngrejseplanenapi/us-central1/api';
  private productionBaseUrl: string = 'https://us-central1-ngrejseplanenapi.cloudfunctions.net/api';

  private developmentApiVersion: string = 'v1';
  private productionApiVersion: string = 'v1';

  private apiRoutes = {
    location: 'location',
    departureBoard: 'boards',
    journeyDetail: 'journey'
  };

  constructor(
    private http: HttpClient,
    private transferState: TransferState
  ) {}

  public getLocation(searchString: string): Observable<ApiLocationResponse> {
    const url = this.buildUrl(this.apiRoutes.location);
    const params = new HttpParams().set('input', searchString);
    return this.http.get<ApiLocationResponse>(url, {params: params});
  }

  getDepartureBoard(stopId: string): Observable<ApiDepartureBoardResponse> {
    const url = this.buildUrl(this.apiRoutes.departureBoard);

    return this.http.get<ApiDepartureBoardResponse>(`${url}/${stopId}`);
  }

  getJourney(journeyRef: string): Observable<ApiJourneyDetailResponse> {
    const url = this.buildUrl(this.apiRoutes.journeyDetail);
    const params = new HttpParams().set('ref', journeyRef);

    return this.http.get<ApiJourneyDetailResponse>(url, {params: params});
  }

  private buildUrl(routePath: string): string {
    return [
      environment.production ? this.productionBaseUrl : this.developmentBaseUrl,
      environment.production ? this.productionApiVersion : this.developmentApiVersion,
      routePath || null
    ].join('/');
  }

}
