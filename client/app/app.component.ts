import {Component, OnChanges, OnInit} from "@angular/core";
import {RejseplanenService} from "./core/data/rejseplanen/rejseplanen.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiLocationStopLocation} from "./core/data/rejseplanen/models/location-stop-location";
import {ApiLocationResponse} from "./core/data/rejseplanen/responses/location";
import {ApiDepartureBoardResponse} from "./core/data/rejseplanen/responses/departure-board";
import {ApiDeparture} from "./core/data/rejseplanen/models/departure";
import {ApiJourneyDetailResponse} from "./core/data/rejseplanen/responses/journey-detail";
import {Router} from '@angular/router';

@Component({
  selector: 'ngr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {

  public locationSearchForm: FormGroup;

  public locations: ApiLocationStopLocation[];
  public departureBoards: ApiDeparture[];
  public journeyDetail: any;

  constructor(
    private rejseplanen: RejseplanenService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.locationSearchForm.reset({input: ''});
  }

  public onSubmit() {
    this.router.navigate(['/search/location'], {
      queryParams: {
        location: this.locationSearchForm.get('input').value
      }
    });
    // this.rejseplanen.getLocation(this.locationSearchForm.get('input').value)
    //   .subscribe(
    //     (response: ApiLocationResponse) => {
    //       this.locations = response.data.stopLocation;
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }

  public onStopClicked(stopId: string) {
    this.rejseplanen.getDepartureBoard(stopId)
      .subscribe(
        (response: ApiDepartureBoardResponse) => {
          console.warn(`wat`, response);
          this.departureBoards = response.data;
        }
      )
  }

  public onDepartureClicked(journeyRef: string) {
    this.rejseplanen.getJourney(journeyRef)
      .subscribe(
        (response: ApiJourneyDetailResponse) => {
          console.warn('wut', response);
          this.journeyDetail = response.data;
        }
      )
  }

  private createForm(): void {
    this.locationSearchForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }

}
