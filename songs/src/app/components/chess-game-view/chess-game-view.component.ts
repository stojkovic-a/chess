import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Game, PositionToGame } from 'src/app/models';
import { loadGameWithPositions } from 'src/app/store/game/game.action';
import { selectGameWithPositions, selectMoveNumber, selectSelectedGame } from 'src/app/store/game/game.selector';
@Component({
  selector: 'app-chess-game-view',
  templateUrl: './chess-game-view.component.html',
  styleUrls: ['./chess-game-view.component.scss']
})
export class ChessGameViewComponent implements OnInit {
  @Input() id;
  @ViewChild('focused') divToFocus: ElementRef;
  selectedGame$: Observable<Game> = of();
  positionsToGame: PositionToGame[] = [];
  startingPosition: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  currentFen: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  currentExpandedFen: string;
  inverted: boolean = false;
  currentMove: number = -1;


  constructor(private store: Store<AppState>) {
    this.currentExpandedFen = this.expandFen(this.currentFen);
  }
  getPieceClass(row: number, col: number): string {
    let i = (row) * 8 + (col);
    if (this.inverted) {
      return this.currentExpandedFen[(7 - row) * 8 + (7 - col)];
    }
    return this.currentExpandedFen[i];
  }
  ngOnInit(): void {
    this.selectedGame$ = this.store.select(selectSelectedGame);
    this.selectedGame$
      .subscribe((game) => {
        if (game) {
          this.store.dispatch(loadGameWithPositions({ id: game.id }));
        } else {
          if (this.id) {
            this.store.dispatch(loadGameWithPositions({ id: this.id }))
          }
        }
      })
    this.store.select(selectGameWithPositions)
      .subscribe((game) => {
        if (game) {
          this.positionsToGame = game.positionToGame;
        }
      })

    this.store.select(selectMoveNumber)
      .subscribe((num) =>
        this.currentMove = num
      )

  }

  ngAfterViewInit() {
    this.divToFocus.nativeElement.focus();
  }

  nextMove() {
    if (this.currentMove + 1 < this.positionsToGame.length) {
      this.currentMove++;
      this.currentFen = this.positionsToGame[this.currentMove].position.position;
      this.currentExpandedFen = this.expandFen(this.currentFen);
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
    return expandedFen;
  }



}
