import { Injectable } from '@angular/core';
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {HttpClient, } from "@angular/common/http";
import {Observable} from "rxjs/Observable";

const CACHE_KEY = makeStateKey('NG_REJSEPLANEN');

@Injectable()
export class TransferHttpService {

  constructor(
    private http: HttpClient,
    private transferState: TransferState
  ) { }

  get(url: string, options: any): Observable<any> {
    return this.getData(url, options, (url: string, options: any) => {
      return this.http.get(url, options);
    });
  }

  getData(url: string, options: any, callback: (url: string, options: any) => Observable<any>) {

  }

  private resolveData(key: string) {
    const data = this.getFromCache(key);

    if(!data) {
      throw new Error();
    }

    return Observable.from(Promise.resolve(data))
  }

  private setCache(key, data) {
    this.transferState.set(CACHE_KEY, data);
  }

  private getFromCache(key): any {
      return this.transferState.get(CACHE_KEY, null as any);
  }

}
