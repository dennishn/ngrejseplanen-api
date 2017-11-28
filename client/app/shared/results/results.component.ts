import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ngr-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent implements OnInit, OnChanges {

  @Input() results: any;

  constructor(

  ) {

  }

  ngOnInit() {

  }

  ngOnChanges() {

  }
}
