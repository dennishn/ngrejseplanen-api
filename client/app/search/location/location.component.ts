import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {pluck, map} from 'rxjs/operators';
import {ApiLocationResponse} from "../../core/data/rejseplanen/responses/location";

@Component({
  selector: 'ngr-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnChanges {

  public locationSearchForm: FormGroup;
  public results$: Observable<ApiLocationResponse>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.results$ = this.route.data.pipe(
      pluck('results'),
      map((results: ApiLocationResponse) => results),
    );
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
  }

  private createForm(): void {
    this.locationSearchForm = this.formBuilder.group({
      input: ['', Validators.required]
    });
  }

}
