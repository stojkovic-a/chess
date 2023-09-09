import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../models';
import { environment } from 'src/environments/environment.development';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Observable, from, of, take } from 'rxjs';
import { selectPagesNumber } from '../../store/chess.selector';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  page$: Observable<number> = of();
  constructor(private httpClient: HttpClient, private store: Store<AppState>) {
  }


  getGamesPaging() {
    this.page$ = this.store.select(selectPagesNumber);
    let skip = 0;
    this.page$.pipe(
      take(1),
    ).subscribe(
      num => skip = num
    );
    console.log("aaa");
    const takeNum = environment.page_size;
    skip = takeNum * skip;

    return this.httpClient.get<Game[]>(environment.api + `game/page/${skip}/${takeNum}`)
  }
}
