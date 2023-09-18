import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { loadFilters, selectBlackPlayerFilter, selectEndDateFilter, selectTournamentFilter, selectResultFilter, selectStartDateFilter, selectWhitePlayerFilter } from 'src/app/store/filter/filter.action';
import {
  selectWhitePlayerFilter as SelectWhite,
  selectBlackPlayerFilter as SelectBlack,
  selectTournamentFilter as SelectTournament,
  selectStartDateFilter as SelectStart,
  selectEndDateFilter as SelectEnd,
  selectResultFilter as SelectResult,
  selectPlayerFilters,
  selectTournamentFilters
} from 'src/app/store/filter/filter.selector';

@Component({
  selector: 'app-chess-games-filters',
  templateUrl: './chess-games-filters.component.html',
  styleUrls: ['./chess-games-filters.component.scss']
})
export class ChessGamesFiltersComponent {

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<Date>> = new EventEmitter<MatDatepickerInputEvent<Date>>();
  whitePlayerControl = new FormControl('');
  blackPlayerControl = new FormControl('');
  resultControl = new FormControl('');
  tournamentControl = new FormControl('');
  startFormControl = new FormControl();
  endFormControl = new FormControl();


  whiteFilter: string = "";
  blackFilter: string = "";
  resultFilter: string = "";

  dateChangeStart(value: string) {
    this.store.dispatch(selectStartDateFilter({ startDate: new Date(value) }))
    this.store.select(SelectStart)
      .subscribe((filter) => this.startFormControl.setValue(filter));
  }

  dateChangeEnd(value: string) {
    this.store.dispatch(selectEndDateFilter({ endDate: new Date(value) }))
    this.store.select(SelectEnd)
      .subscribe((filter) => this.endFormControl.setValue(filter));
  }

  whitePlayerSelected(value: string) {
    this.store.dispatch(selectWhitePlayerFilter({ fullName: value }));
    this.store.select(SelectWhite)
      .subscribe((filter) => this.whitePlayerControl.setValue(filter));
  }

  blackPlayerSelected(value: string) {
    this.store.dispatch(selectBlackPlayerFilter({ fullName: value }));
    this.store.select(SelectBlack)
      .subscribe((filter) => this.blackPlayerControl.setValue(filter));
  }

  resultSelected(value: string) {
    this.store.dispatch(selectResultFilter({ result: value }));
    this.store.select(SelectResult)
      .subscribe((filter) => {
        this.resultControl.setValue(filter);
        this.resultFilter = filter;
      });
  }

  tournamentSelected(value: string) {
    this.store.dispatch(selectTournamentFilter({ tournament: value }));
    this.store.select(SelectTournament)
      .subscribe((filter) => this.tournamentControl.setValue(filter));
  }

  resultOptions: string[] = ['1-0', '1/2-1/2', '0-1'];
  playerOptions1: string[] = [];
  playerOptions2: string[] = [];
  tournamentOptions: string[] = ['Friendly'];
  options: string[] = ['chiz', 'nesto drugo'];


  filteredOptions1!: Observable<string[]>;
  filteredOptions2!: Observable<string[]>;
  filteredOptions3!: Observable<string[]>;
  filteredOptions6!: Observable<string[]>;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(new Date(Date.now())),
  });



  constructor(private store: Store<AppState>) {

  }
  ngOnInit() {
    this.store.dispatch(loadFilters());
    this.store.select(selectPlayerFilters)
      .subscribe((filters) => {
        this.playerOptions1 = filters
        this.playerOptions2 = filters
        this.filteredOptions1 = this.whitePlayerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.playerOptions1)),
        );
        this.filteredOptions2 = this.blackPlayerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.playerOptions2)),
        );
      });

    this.store.select(selectTournamentFilters)
      .subscribe((filters) => {
        this.tournamentOptions = filters;
        console.log(this.tournamentOptions, 'aaaajcigadag');

        this.filteredOptions6 = this.tournamentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.tournamentOptions)),
        );
      });

    this.filteredOptions2 = this.blackPlayerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.playerOptions2)),
    );
    this.filteredOptions3 = this.resultControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.resultOptions)),
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

 test(){
  console.log('ima nade');
 }
}
