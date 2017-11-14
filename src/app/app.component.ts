import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ngr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngr';
  response: string = '';
  requests: number = 0;

  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.requests++;
    this.http.get('https://us-central1-ngrejseplanenapi.cloudfunctions.net/api/api/v1', {
      responseType: 'text'
    })
      .subscribe((res: any) => {
        console.warn('YAAAY', res);
        console.info('reqs', this.requests);
        this.response = res;
      });
  }
}
