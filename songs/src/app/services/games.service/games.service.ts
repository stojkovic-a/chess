import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Game, GameCreationDto, GameTournamentIds } from '../../models';
import { environment } from 'src/environments/environment.development';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, from, of, take } from 'rxjs';
import { selectBlackPlayerFilter, selectEndDateFilter, selectResultFilter, selectStartDateFilter, selectTournamentFilter, selectWhitePlayerFilter } from '../../store/filter/filter.selector';
import { GamePosNum } from 'src/app/interfaces';
import { selectPagesNumber } from 'src/app/store/page/page.selector';

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
    const takeNum = pageSize;
    skip = pageSize * skip;

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
    return this.httpClient.post<Game[]>(environment.api + `game/pageFilter/${skip}/${takeNum}`, {
      params
    });
  }

  getNumberOfGames() {
    return this.httpClient.get<number>(environment.api + 'game/number/count');
  }

  getGameWithPositions(id: number) {
    return this.httpClient.get<Game>(environment.api + `game/positions/${id}`);
  }

  getGameByPosition(position: string, pageNum: number, pageSize: number) {
    const params = {
      'position': position,
      'pageNum': pageNum,
      'pageSize': pageSize,
    }
    return this.httpClient.post<GamePosNum[]>(environment.api + `position-to-game/position`, {
      params
    });
  }

  getNumberOfGamesByPosition(position: string) {
    const params = {
      'position': position,
    }

    return this.httpClient.post<number>(environment.api + 'position-to-game/positionNum', {
      params
    });
  }

  deleteGame(id: number) {
    return this.httpClient.delete(environment.api + `game/${id}`);
  }

  createGame(dto: GameCreationDto) {
    return this.httpClient.post<number>(environment.api + `game`, dto);
  }


  getNumberOfTournamentGames() {
    return this.httpClient.get<number>(environment.api + 'game/number/count');
  }

  getTournamentGamesIdsPagination(skip: number, take: number) {
    return this.httpClient.get<GameTournamentIds[]>(environment.api + `game/tournamentJoin/${skip}/${take}`);
  }
}
