import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Game } from 'src/app/models';
import { loadGamesByPosition } from 'src/app/store/chess.action';
import { selectGamesByPosition } from 'src/app/store/chess.selector';
import * as ChessActions from '../../store/chess.action';


@Component({
  selector: 'app-games-with-position',
  templateUrl: './games-with-position.component.html',
  styleUrls: ['./games-with-position.component.scss']
})
export class GamesWithPositionComponent implements OnInit {
  @Input() currentFen: string;

  games: Game[] = [];
  moveNums: number[] = [];
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadGamesByPosition({ position: this.currentFen }));
    this.store.select(selectGamesByPosition)
      .subscribe((combination) => {
        console.log(combination);
        this.games = combination.games;
        this.moveNums = combination.moveNums;
      }
      )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentFen']) {
      this.store.dispatch(loadGamesByPosition({ position: this.currentFen }));

    }
  }

  getResult(game: Game): string {
    if (game.winnerId == game.whitePlayer.id) {
      return "1-0";
    } else if (game.winnerId == game.blackPlayer.id) {
      return "0-1";
    } else {
      return "1/2-1/2";
    }
  }

  gameSelected(game: Game, index: number) {
    this.store.dispatch(ChessActions.selectGame({ game }));
    this.store.dispatch(ChessActions.setCurrentGameMove({ moveNum: this.moveNums[index]-1 }));
    console.log('sve hoce');
  }
}
