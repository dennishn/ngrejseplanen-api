import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {pluck, map} from 'rxjs/operators'
import {ApiLocationResponse} from "../../core/data/rejseplanen/responses/location";

@Component({
  selector: 'ngr-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input() public results: ApiLocationResponse;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {

  }
}
