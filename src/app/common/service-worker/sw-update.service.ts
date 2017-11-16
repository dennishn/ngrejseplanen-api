import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";
import {isPlatformBrowser} from "@angular/common";

@Injectable()
export class SwUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log('swUpdateService is browser', isPlatformBrowser(this.platformId));
    // if(isPlatformBrowser(this.platformId)) {
      console.log(`its ze browser! eins zwei drei we check for updates ... why does none of the hashes change wtf wtf wtf`);
      this.swUpdate.available.subscribe(event => {
        console.log('[App] Update:', event);
      });
      this.swUpdate.activated.subscribe(event => {
        console.log('[App] Activated:', event.current);
      });

      setTimeout(() => {
        console.log('calling the thing');
        this.swUpdate.checkForUpdate().then((e) => {
          console.warn('checked for update!', e);
        }).catch((e) => console.error('failed', e));
      }, 10000);
    // }
  }
}
