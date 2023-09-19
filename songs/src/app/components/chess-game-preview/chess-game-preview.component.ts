import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game, Player } from '../../models';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

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

      this.onPlayerClick.emit(this.game.whitePlayer);
    }
  }

  blackPlayerClicked() {
    if (this.game?.blackPlayer) {
      this.onPlayerClick.emit(this.game.blackPlayer);
    }
  }
}
