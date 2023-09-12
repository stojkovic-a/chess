import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Game, Position, PositionToGame } from 'src/app/models';
import { loadGameWithPositions } from 'src/app/store/chess.action';
import { selectGameWithPositions, selectSelectedGame } from 'src/app/store/chess.selector';
@Component({
  selector: 'app-chess-game-view',
  templateUrl: './chess-game-view.component.html',
  styleUrls: ['./chess-game-view.component.scss']
})
export class ChessGameViewComponent implements OnInit {

  selectedGame$: Observable<Game> = of();
  positionsToGame: PositionToGame[] = [];
  startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  currentFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  currentExpandedFen: string;
  inverted: boolean = false;
  currentMove: number = -1;
  chessboard: string[][] = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
  ];

  constructor(private store: Store<AppState>) {
    this.currentExpandedFen = this.expandFen(this.currentFen);
  }
  getPieceClass(row: number, col: number): string {
    let i = (row) * 8 + (col);
    if (this.inverted) {
      return this.currentExpandedFen[(7 - row) * 8 + (7-col)];
    }
    return this.currentExpandedFen[i];
    // while (j <= i) {
    //     if (this.currentFen[iter] === '/') {
    //       iter++
    //     }
    //   if (j === i) {
    //     return this.currentFen[iter];
    //   }
    //   if (this.currentFen[iter].match(/[a-z]/i)) {
    //     j++;
    //   } else if (/^[0-9]$/.test(this.currentFen[iter])) {
    //     j += parseInt(this.currentFen[iter]);
    //   }
    //   iter++;
    // }
    // return "";


  }
  ngOnInit(): void {
    this.selectedGame$ = this.store.select(selectSelectedGame);
    this.selectedGame$
      .subscribe((game) => {
        console.log(game);
        this.store.dispatch(loadGameWithPositions({ id: game.id }));
      })
    this.store.select(selectGameWithPositions)
      .subscribe((game) => {
        this.positionsToGame = game.positionToGame;
        console.log('aaaaaaaaaaa', game);
      })
  }

  nextMove() {
    if (this.currentMove + 1 < this.positionsToGame.length) {
      this.currentMove++;
      this.currentFen = this.positionsToGame[this.currentMove].position.position;
      this.currentExpandedFen = this.expandFen(this.currentFen);
      console.log('clicked napred');
      console.log(this.currentFen);
    }
  }

  prevMove() {
    if (this.currentMove >= 0) {
      this.currentMove--;
      if (this.currentMove == -1) {
        this.currentFen = this.startingPosition;
        this.currentExpandedFen = this.expandFen(this.currentFen);
      } else {
        this.currentFen = this.positionsToGame[this.currentMove].position.position;
        this.currentExpandedFen = this.expandFen(this.currentFen);
      }
    }
  }

  invert() {

    this.inverted = !this.inverted;
  }

  expandFen(fen: string): string {
    let expandedFen = "";
    for (const char of fen) {
      if (char === ' ')
        break;
      if (char.match(/[a-z]/i)) {
        expandedFen += char;
      } else if (/^[0-9]$/.test(char)) {
        expandedFen += (" ".repeat(parseInt(char)));
      } else if (char === '/') {
        continue;
      }
    }
    console.log(expandedFen);
    return expandedFen;
  }
}
