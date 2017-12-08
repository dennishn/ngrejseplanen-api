import {Component, OnInit} from '@angular/core';
import {ApiCoordLocation} from "../../../core/data/rejseplanen/models/coord-location";
import {ApiLocationStopLocation} from "../../../core/data/rejseplanen/models/location-stop-location";
import {Observable} from "rxjs/Observable";
import {SearchState} from "../../state/search-state.service";

@Component({
    selector: 'ngr-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchContainerComponent implements OnInit {

    public results$: Observable<ApiLocationStopLocation[] | ApiCoordLocation[]>;

    constructor(
        private searchState: SearchState
    ) {

    }

    ngOnInit() {
        this.results$ = this.searchState.results$;
    }

}
