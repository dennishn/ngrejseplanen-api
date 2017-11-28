import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs/Observable";
import {pluck, map} from 'rxjs/operators'

@Component({
  selector: 'ngr-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnChanges {

  public results$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.results$ = this.route.data.pipe(
        pluck('results'),
        map((result: any) => {
          console.warn('straight from the routingzzzz', result);
          return result
        })
    );
  }

  ngOnChanges() {

  }
}
