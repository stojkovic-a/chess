import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GameType } from 'src/app/enums';
import { Tournament } from 'src/app/models';
import { CreateTournament } from 'src/app/store/tournament/tournament.action';
import { selectCreatedTournamentId } from 'src/app/store/tournament/tournament.selector';

@Component({
  selector: 'app-administration-tournament-add',
  templateUrl: './administration-tournament-add.component.html',
  styleUrls: ['./administration-tournament-add.component.scss']
})
export class AdministrationTournamentAddComponent implements OnInit {
  tournament: Tournament = {
    id: -1,
    tournamentName: "",
    startingDate: null,
    endingDate: null,
    minElo: 0,
    gamesType: null
  };
  id: number;
  tournamentName: string;
  startingDate: Date;
  endingDate: Date | null;
  minElo: number;

  gamesType: string;
  gamesTypeEnum: GameType = GameType.CLASSICAL;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    for (const key in GameType) {
      if (GameType.hasOwnProperty(key) && GameType[key] === this.gamesType) {
        this.gamesTypeEnum = GameType[key]
      }
    }
    this.tournament = {
      ...this.tournament,
      gamesType: this.gamesTypeEnum,
      tournamentName: this.tournamentName,
      startingDate: this.startingDate,
      endingDate: this.endingDate,
      minElo: this.minElo
    }
    this.store.dispatch(CreateTournament({ tournament: this.tournament }));
    this.store.select(selectCreatedTournamentId)
      .subscribe((id) => {
        if (id)
          this.snackBar.open(`Successfully created a tournament: ${id}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite'
          })
      })

  }
}
