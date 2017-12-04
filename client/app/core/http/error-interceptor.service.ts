import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {catchError} from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
import {MatSnackBar} from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e: HttpErrorResponse) => {
        // Status 0, or no status indicates client-side issues
        if(e.status === 0 || !e.status) {
          this.snackBar.open('Connection error, please try again', null, {
            duration: 3000
          });
        }
        return _throw(e);
      })
    )
  }
}
