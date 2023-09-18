import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { deleteSelectedTournament } from 'src/app/store/tournament/tournament.action';
import { selectDeletedTournament, selectSelectedTournamentId } from 'src/app/store/tournament/tournament.selector';

@Component({
  selector: 'app-administration-tournament-delete',
  templateUrl: './administration-tournament-delete.component.html',
  styleUrls: ['./administration-tournament-delete.component.scss']
})
export class AdministrationTournamentDeleteComponent implements OnInit {
  selectedTournamentId: number;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
  ) {
  }

  onSubmit() {
    this.store.dispatch(deleteSelectedTournament({ tournamentId: this.selectedTournamentId }));
    this.store.select(selectDeletedTournament)
      .subscribe(tournamentId => {
        if (tournamentId) {
          this.snackBar.open(`Successfully deleted a tournament: ${tournamentId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

  ngOnInit(): void {
    this.store.select(selectSelectedTournamentId)
      .subscribe(id =>
        this.selectedTournamentId = id
      )
  }

}
