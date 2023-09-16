import { Component, OnInit } from '@angular/core';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { GameType } from 'src/app/enums';
import { Tournament } from 'src/app/models';
import { DateService } from 'src/app/services/date.service/date.service';
import { addGameToTournament, addPlayerToTournament, removeGameFromTournament, removePlayerFromTournament, updateTournament } from 'src/app/store/chess.action';
import { selectAddedGame, selectAddedPlayer, selectRemovedGame, selectRemovedPlayer, selectSelectedTournament, selectTournamentUpdateId } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-administration-tournament-update',
  templateUrl: './administration-tournament-update.component.html',
  styleUrls: ['./administration-tournament-update.component.scss']
})
export class AdministrationTournamentUpdateComponent implements OnInit {
  tournament: Tournament = {
    id: 0,
    tournamentName: "",
    startingDate: null,
    endingDate: null,
    gamesType: null,
    minElo: 0
  }

  startDateFormat: string;
  endDateFormat: string;

  gamesType: string;
  gamesTypeEnum: GameType = GameType.CLASSICAL;

  gameAddId: number = 0;
  gameRemoveId: number = 0;
  playerAddId: number = 0;
  playerRemoveId: number = 0;
  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dateService: DateService
  ) {

  }

  ngOnInit(): void {
    this.store.select(selectSelectedTournament)
      .subscribe(tournament => {
        if (tournament) {
          this.tournament = { ...tournament };
          this.startDateFormat = this.dateService.formatDateDash(tournament.startingDate);
          this.endDateFormat = this.dateService.formatDate(tournament.endingDate);
        }
      })
  }

  updateTournament() {
    for (const key in GameType) {
      if (GameType.hasOwnProperty(key) && GameType[key] === this.gamesType) {
        this.gamesTypeEnum = GameType[key]
      }
    }

    this.tournament = {
      ...this.tournament,
      startingDate: new Date(this.startDateFormat),
      endingDate: new Date(this.endDateFormat),
      gamesType: this.gamesTypeEnum
    }

    this.store.dispatch(updateTournament({ tournament: this.tournament }));
    this.store.select(selectTournamentUpdateId)
      .subscribe((id) => {
        if (id) {
          this.snackBar.open(`Successfully updated a tournament: ${id}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

  addGame() {
    this.store.dispatch(addGameToTournament({ tournamentId: this.tournament.id, gameId: this.gameAddId }));
    this.store.select(selectAddedGame)
      .subscribe((ids) => {
        if (ids) {
          this.snackBar.open(`Successfully added game: ${ids.gameId} to tournament: ${ids.tournamentId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

  removeGame() {
    this.store.dispatch(removeGameFromTournament({ tournamentId: this.tournament.id, gameId: this.gameRemoveId }));
    this.store.select(selectRemovedGame)
      .subscribe((ids) => {
        if (ids) {
          this.snackBar.open(`Successfully removed game: ${ids.gameId} from tournament: ${ids.tournamentId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

  addPlayer() {
    this.store.dispatch(addPlayerToTournament({ tournamentId: this.tournament.id, playerId: this.playerAddId }));
    this.store.select(selectAddedPlayer)
      .subscribe((ids) => {
        if (ids) {
          this.snackBar.open(`Successfully add player: ${ids.playerId} to tournament: ${ids.tournamentId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

  removePlayer() {
    this.store.dispatch(removePlayerFromTournament({ tournamentId: this.tournament.id, playerId: this.playerRemoveId }));
    this.store.select(selectRemovedPlayer)
      .subscribe((ids) => {
        if (ids) {
          this.snackBar.open(`Successfully removed player: ${ids.playerId} from a tournament: ${ids.tournamentId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }
}
