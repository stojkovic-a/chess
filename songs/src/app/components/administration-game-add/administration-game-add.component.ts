import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { takeLast } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GameCreationDto } from 'src/app/models';
import { createGame } from 'src/app/store/chess.action';
import { selectCreatedGameId } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-administration-game-add',
  templateUrl: './administration-game-add.component.html',
  styleUrls: ['./administration-game-add.component.scss']
})
export class AdministrationGameAddComponent implements OnInit {

  game: GameCreationDto = new GameCreationDto();
  gamePgnAsString: string = ""
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {

    this.game.addPgn(this.gamePgnAsString);
    this.store.dispatch(createGame({ gameCreationDto: this.game }));
    this.store.select(selectCreatedGameId)
      .pipe(
    )
      .subscribe((id) => {
        if (id)
          this.snackBar.open(`Successfully created a game: ${id}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
      });
    this.game = new GameCreationDto();
  }
}
