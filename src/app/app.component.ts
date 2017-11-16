import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {makeStateKey, TransferState} from "@angular/platform-browser";

const FOO_KEY = makeStateKey('foo');

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
    private http: HttpClient,
    private transferState: TransferState
  ) {
    console.log('omg');
  }

  ngOnInit() {
    // Stuuuupid but proof of concept that transfer state works :)
    this.response = this.transferState.get(FOO_KEY, null as any);
    if(!this.response) {
      console.warn('nothing in state thingie :(');
      this.getData();
    }
  }

  private getData() {
    console.info('getting dataz');
    this.http.get(`https://us-central1-ngrejseplanenapi.cloudfunctions.net/api/v1`, {responseType: 'text'})
      .subscribe((d: any) => {
        console.error(`gottenz dataz`, d);
        this.response = d;
        this.transferState.set(FOO_KEY, d);
      });
  }
}
