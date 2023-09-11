import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { Observable, map, startWith } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { loadFilters, selectBlackPlayerFilter, selectEndDateFilter, selectTournamentFilter, selectResultFilter, selectStartDateFilter, selectWhitePlayerFilter } from 'src/app/store/chess.action';
import { selectPlayerFilters, selectTournamentFilters } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-chess-games-filters',
  templateUrl: './chess-games-filters.component.html',
  styleUrls: ['./chess-games-filters.component.scss']
})
export class ChessGamesFiltersComponent {

  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<Date>> = new EventEmitter<MatDatepickerInputEvent<Date>>();
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');
  myControl6 = new FormControl('');

  dateChangeStart(value: string) {
    this.store.dispatch(selectStartDateFilter({ startDate: new Date(value) }))
  }

  dateChangeEnd(value: string) {
    this.store.dispatch(selectEndDateFilter({ endDate: new Date(value) }))
  }

  whitePlayerSelected(value: string) {
    this.store.dispatch(selectWhitePlayerFilter({ fullName: value }));
  }

  blackPlayerSelected(value: string) {
    this.store.dispatch(selectBlackPlayerFilter({ fullName: value }));
  }

  resultSelected(value: string) {
    this.store.dispatch(selectResultFilter({ result: value }));
  }

  tournamentSelected(value: string) {
    this.store.dispatch(selectTournamentFilter({ tournament: value }));
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
        this.filteredOptions1 = this.myControl1.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.playerOptions1)),
        );
        this.filteredOptions2 = this.myControl2.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.playerOptions2)),
        );
      });

    this.store.select(selectTournamentFilters)
      .subscribe((filters) => {
        this.tournamentOptions = filters;
        console.log(this.tournamentOptions, 'aaaajcigadag');
        if (this.tournamentOptions[0] === null || this.tournamentOptions.length === 0) {
          this.tournamentOptions = ['Friendly'];
        } else {
          this.tournamentOptions.push("Friendly");
        }
        this.filteredOptions6 = this.myControl6.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.tournamentOptions)),
        );
      });

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.playerOptions2)),
    );
    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.resultOptions)),
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }


}
