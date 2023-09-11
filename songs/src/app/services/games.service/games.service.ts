import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game } from '../../models';
import { environment } from 'src/environments/environment.development';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, from, of, take } from 'rxjs';
import { selectBlackPlayerFilter, selectEndDateFilter, selectPagesNumber, selectResultFilter, selectStartDateFilter, selectTournamentFilter, selectWhitePlayerFilter } from '../../store/chess.selector';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  page$: Observable<number> = of();
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
  }


  getGamesPaging(pageSize: number) {
    this.page$ = this.store.select(selectPagesNumber);
    let skip = 0;
    this.page$.pipe(
    ).subscribe(
      num => skip = num - 1
    );
    console.log("aaa", skip);
    const takeNum = pageSize;
    skip = pageSize * skip;
    console.log(pageSize, 'pageSize');
    console.log(skip, 'skip');

    let whitePlayerFilter: string = "";
    let blackPlayerFilter: string = "";
    let resultFilter: string = "";
    let startDateFilter: Date | null = null;
    let endDateFilter: Date = new Date(Date.now());
    let tournamentFilter: string = "";

    this.store.select(selectWhitePlayerFilter)
      .subscribe(
        filter => whitePlayerFilter = filter
      );
    this.store.select(selectBlackPlayerFilter)
      .subscribe(
        filter => blackPlayerFilter = filter
      );
    this.store.select(selectStartDateFilter)
      .subscribe(
        filter => startDateFilter = filter
      );
    this.store.select(selectEndDateFilter)
      .subscribe(
        filter => endDateFilter = filter
      );
    this.store.select(selectTournamentFilter)
      .subscribe(
        filter => tournamentFilter = filter
      );
    this.store.select(selectResultFilter)
      .subscribe(
        filter => resultFilter = filter
      );
    console.log(whitePlayerFilter);
    let startD = '';
    if (startDateFilter != null) {
      startD += startDateFilter;
    }
    const params = {
      "white": whitePlayerFilter,
      'black': blackPlayerFilter,
      'res': resultFilter,
      'startD': startD,
      'endD': endDateFilter.toString(),
      'tour': tournamentFilter,
    }
    console.log(params, 'PARAMS');
    return this.httpClient.post<Game[]>(environment.api + `game/pageFilter/${skip}/${takeNum}`, {
    params
    });
  }

  getNumberOfGames() {
    return this.httpClient.get<number>(environment.api + 'game/number/count');
  }
}
