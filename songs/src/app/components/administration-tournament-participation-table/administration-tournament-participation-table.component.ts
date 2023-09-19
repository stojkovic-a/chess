import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { PlayerTournamentIds } from 'src/app/models';
import { loadNumberOfParticipations, loadParticipationsPagination } from 'src/app/store/tournament/tournament.action';
import { selectNumberOfParticipation, selectParticipations } from 'src/app/store/tournament/tournament.selector';

@Component({
  selector: 'app-administration-tournament-participation-table',
  templateUrl: './administration-tournament-participation-table.component.html',
  styleUrls: ['./administration-tournament-participation-table.component.scss']
})
export class AdministrationTournamentParticipationTableComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  playerTournament: PlayerTournamentIds[];

  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<PlayerTournamentIds>();
  isLoading = true;

  selectedTournamentId: number;
  selectedPlayerId: number;

  displayedColumns: string[] = [
    'tournamentId',
    'playerId'
  ]
  pageSize = [10];

  constructor(
    private store: Store<AppState>
  ) {

  }

  getTableData$(pageNumber: number, pageSize: number) {
    this.store.dispatch(loadParticipationsPagination({
      skip: pageNumber * pageSize,
      take: pageSize
    }))

    return this.store.select(selectParticipations);
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
        this.playerTournament = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.playerTournament);
      })
  }

  getNumberOfParticipations() {
    this.store.dispatch(loadNumberOfParticipations());
  }


  ngOnInit(): void {
    this.getNumberOfParticipations();
    this.store.select(selectNumberOfParticipation)
      .subscribe((num) => {
        this.totalData = num;
        this.paginator.length = num;
      })
  }
}
