import {Injectable} from "@angular/core";
import {ApiLocationStopLocation} from "../../core/data/rejseplanen/models/location-stop-location";
import {ApiCoordLocation} from "../../core/data/rejseplanen/models/coord-location";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {RejseplanenService} from "../../core/data/rejseplanen/rejseplanen.service";
import {ApiLocationResponse} from "../../core/data/rejseplanen/responses/location";

enum SearchModes {
    Location = 'LOCATION',
    Position = 'POSITION'
}

interface ISearchState {
    isLoading: boolean;
    isError: boolean;
    searchMode: SearchModes;
    results: ApiLocationStopLocation[] | ApiCoordLocation[];
}

@Injectable()
export class SearchState {
    private _state: ISearchState;

    private _results: BehaviorSubject<ApiLocationStopLocation[] | ApiCoordLocation[]>;
    public get results$(): Observable<ApiLocationStopLocation[] | ApiCoordLocation[]> {
        return this._results.asObservable();
    }

    constructor(
        private rejseplanen: RejseplanenService
    ) {
        this._state = {
            isLoading: false,
            isError: false,
            searchMode: SearchModes.Location,
            results: []
        };

        this._results = new BehaviorSubject([]);
    }

    public searchByLocation(searchTerm: string): void {
        this._state.isLoading = true;
        this.rejseplanen.getLocation(searchTerm).subscribe(
            (result: ApiLocationResponse) => {
                this._state.results = result.data.stopLocation;
                this._results.next(Object.assign({}, this._state).results);
            }
        );
    }
}
