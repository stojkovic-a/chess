import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { GameTournamentIds } from 'src/app/models';
import { loadNumberOfGameTournaments, loadTournamentGamePagination } from 'src/app/store/tournament/tournament.action';
import { selectGamesTournaments, selectNumberOfGameTournaments } from 'src/app/store/tournament/tournament.selector';

@Component({
  selector: 'app-administration-tournament-game-table',
  templateUrl: './administration-tournament-game-table.component.html',
  styleUrls: ['./administration-tournament-game-table.component.scss']
})
export class AdministrationTournamentGameTableComponent {
  @ViewChild('paginator') paginator: MatPaginator;

  gameTournament: GameTournamentIds[];

  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<GameTournamentIds>();
  isLoading = true;

  selectedTournamentId: number;
  selectedGameId: number;

  displayedColumns: string[] = [
    'tournamentId',
    'gameId'
  ]
  pageSize = [10];

  constructor(
    private store: Store<AppState>
  ) {

  }

  getTableData$(pageNumber: number, pageSize: number) {
    this.store.dispatch(loadTournamentGamePagination({
      skip: pageNumber * pageSize,
      take: pageSize
    }))

    return this.store.select(selectGamesTournaments);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        tap(() => {
          this.isLoading = true;
          this.currentPage++;
        }),
        switchMap(() =>
          this.getTableData$(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)))
        ),
        map((data) => {
          if (data == null) return [];
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((data) => {
        this.gameTournament = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.gameTournament);
      })
  }

  getNumberOfGameTournaments() {
    this.store.dispatch(loadNumberOfGameTournaments());
  }


  ngOnInit(): void {
    this.getNumberOfGameTournaments();
    this.store.select(selectNumberOfGameTournaments)
      .subscribe((num) => {
        this.totalData = num;
        this.paginator.length = num;
      })
  }
}
