import {Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {SwUpdateService} from "./service-worker/sw-update.service";
import {isPlatformBrowser} from "@angular/common";

const FOO_KEY = makeStateKey(`foo`);

@Component({
  selector: `ngr-root`,
  templateUrl: `./app.component.html`,
  styleUrls: [`./app.component.scss`]
})
export class AppComponent implements OnInit {
  title = `ngr`;
  response: string = ``;
  requests: number = 0;

  isBrowser: boolean;
  platform: string;

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    private swUpdate: SwUpdateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.platform = this.isBrowser ? `browser` : `server`;
    console.log(`Hello from AppComponent in the ${this.platform} context`);
    console.log('come on, see this already :-((((((');
  }

  ngOnInit() {

    // Stuuuupid but proof of concept that transfer state works :)
    console.log(`${this.platform}: checking state for existing data`);
    this.response = this.transferState.get(FOO_KEY, null as any);
    if(!this.response) {
      console.warn(`${this.platform}: state was empty, requesting data from api`);
      this.getData();
    }
  }

  private getData() {
    console.info(`${this.platform}: getting data from api`);

    this.http.get(`https://us-central1-ngrejseplanenapi.cloudfunctions.net/api/v1`, {responseType: 'text'})
      .subscribe((d: any) => {
        console.log(`${this.platform}: got data from api: ${d}`);
        this.response = d;
        console.log(`${this.platform}: setting state`);
        this.transferState.set(FOO_KEY, d);
      });
  }
}
