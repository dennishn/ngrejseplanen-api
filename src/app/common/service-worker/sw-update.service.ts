import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class SwUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('swUpdateService daatata  is browser', isPlatformBrowser(this.platformId));

    this.swUpdate.available.subscribe(event => {
      console.log('[App] Update:', event);
      if(window.confirm('App has been updated in the background, relaod?')) {
        window.location.reload(true);
      }
    });
    this.swUpdate.activated.subscribe(event => {
      console.log('[App] Activated:', event.current);
    });
  }
}
