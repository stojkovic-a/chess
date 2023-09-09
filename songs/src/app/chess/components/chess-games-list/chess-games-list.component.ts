import { Component, OnInit } from '@angular/core';
import { Game } from '../../models';
import { Observable, from, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { selectGamesList } from '../../store/chess.selector';
import { loadGames } from '../../store/chess.action';

@Component({
  selector: 'app-chess-games-list',
  templateUrl: './chess-games-list.component.html',
  styleUrls: ['./chess-games-list.component.scss']
})
export class ChessGamesListComponent implements OnInit {
  game$: Observable<Game[]> = of([]);
  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadGames());
    this.game$=this.store.select(selectGamesList);
  }
}
