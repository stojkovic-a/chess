import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { catchError, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Tournament } from 'src/app/models';
import { loadNumberOfTournaments, loadTournamentsPagination, selectTournament } from 'src/app/store/tournament/tournament.action';
import { selectCreatedTournamentId, selectDeletedTournament, selectNumberOfTournaments, selectTournamentPagination, selectTournamentUpdateId } from 'src/app/store/tournament/tournament.selector';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.scss']
})
export class TournamentTableComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  tournaments: Tournament[];

  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<Tournament>();
  isLoading = true;

  selectedTournamentId: number | null = null;

  displayedColumns: string[] = [
    'id',
    'tournamentName',
    'startingDate',
    'endingDate',
    'gamesType',
    'minElo'
  ]
  pageSize = [10];

  constructor(
    private store: Store<AppState>
  ) {

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
        this.tournaments = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.tournaments);
      });


    merge(
      this.store.select(selectCreatedTournamentId),
      this.store.select(selectTournamentUpdateId),
      this.store.select(selectDeletedTournament),
    ).subscribe(() => {
      this.store.dispatch(loadNumberOfTournaments());
      this.getTableData$(this.paginator.pageIndex, this.paginator.pageSize);
    })
  }

  getTableData$(pageNumber: number, pageSize: number) {
    this.store.dispatch(loadTournamentsPagination({
      skip: pageNumber * pageSize,
      take: pageSize
    }))

    return this.store.select(selectTournamentPagination);
  }

  ngOnInit(): void {
    this.getNumberOfTournaments();
    this.store.select(selectNumberOfTournaments)
      .subscribe((num) => {
        this.totalData = num;
        this.paginator.length = num;
      })
  }

  getNumberOfTournaments() {
    this.store.dispatch(loadNumberOfTournaments());
  }

  clickedRow(tournament) {
    this.store.dispatch(selectTournament({ tournamentId: tournament.id }));
    this.selectedTournamentId = tournament.id;
  }

  isSelectedTournament(tournament) {
    return tournament.id === this.selectedTournamentId;
  }
}
