import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game, Player, Tournament } from '../../models';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { loadPlayer } from '../../store/user/user.action';
import { Observable, of, take } from 'rxjs';
import { selectPlayerName } from '../../store/user/user.selector';

@Component({
  selector: 'app-chess-game-preview',
  templateUrl: './chess-game-preview.component.html',
  styleUrls: ['./chess-game-preview.component.scss']
})
export class ChessGamePreviewComponent implements OnInit {
  @Input() game: Game | null = null;
  @Output() onPlayerClick: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() gameClick: EventEmitter<Game> = new EventEmitter<Game>();

  private _gameDate: string | undefined = "";

  get gameDate() {
    return this._gameDate;
  }

  set gameDate(date: string | undefined) {
    this._gameDate = date;
  }
  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    if (this.game) {
      console.log(this.game.gameDate instanceof Date);
      const intermidiateDate = new Date(this.game.gameDate);
      this.gameDate = intermidiateDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }

  }

  whitePlayerClicked() {
    if (this.game?.whitePlayer) {
      console.log("Clicked");

      this.onPlayerClick.emit(this.game.whitePlayer);
    }
  }

  blackPlayerClicked() {
    if (this.game?.blackPlayer) {
      console.log("Clicked");
      this.onPlayerClick.emit(this.game.blackPlayer);
    }
  }
}
