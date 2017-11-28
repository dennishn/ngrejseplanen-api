import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'ngr-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnChanges {

  public locationSearchForm: FormGroup;

  constructor(
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
    console.warn(this.locationSearchForm.get('input'))
    this.router.navigate(['/search/results'], {
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
