import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Game, Player } from '../../models';
import { Observable, catchError, from, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import * as GameActions from '../../store/game/game.action'
import { MatDialog } from '@angular/material/dialog';
import { PlayerInfoComponent } from '../player-info/player-info.component';
import { DateService } from 'src/app/services/date.service/date.service';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Role } from 'src/app/enums';
import { selectRoles } from 'src/app/store/auth/auth.selector';
import { Router } from '@angular/router';
import { selectGamesList } from 'src/app/store/game/game.selector';
import { selectBlackPlayerFilter, selectEndDateFilter, selectResultFilter, selectStartDateFilter, selectTournamentFilter, selectWhitePlayerFilter } from 'src/app/store/filter/filter.selector';
import { changePage } from 'src/app/store/page/page.action';
import { selectNumberOfGames } from 'src/app/store/page/page.selector';

@Component({
  selector: 'app-chess-games-list',
  templateUrl: './chess-games-list.component.html',
  styleUrls: ['./chess-games-list.component.scss']
})
export class ChessGamesListComponent implements OnInit {
  displayedColumns: string[] = [
    'whitePlayer',
    'result',
    'blackPlayer',
    'timeControl',
    'date',
    'tournament',
    'selectGame',
  ];
  isAdmin: boolean = false;

  whitePlayerFilter$: Observable<string> = of("");
  blackPlayerFilter$: Observable<string> = of("");
  resultFilter$: Observable<string> = of("");
  startDateFilter$: Observable<Date | null> = of(null);
  endDateFilter$: Observable<Date> = of(new Date(Date.now()));
  tournamentFilter$: Observable<string> = of("");

  totalData!: number;
  gameData!: Game[]

  dataSource = new MatTableDataSource<Game>();

  isLoading = true;

  sorted: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public dateService: DateService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [1, 5, 10, 20];

  getTableData$(pageNumber: number, pageSize: number) {
    this.store.dispatch(GameActions.loadGames({ pageSize: pageSize }))
    return this.store.select(selectGamesList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.whitePlayerFilter$ = this.store.select(selectWhitePlayerFilter);
    this.blackPlayerFilter$ = this.store.select(selectBlackPlayerFilter);
    this.startDateFilter$ = this.store.select(selectStartDateFilter);
    this.endDateFilter$ = this.store.select(selectEndDateFilter);
    this.tournamentFilter$ = this.store.select(selectTournamentFilter);
    this.resultFilter$ = this.store.select(selectResultFilter);

    merge(
      this.whitePlayerFilter$,
      this.blackPlayerFilter$,
      this.startDateFilter$,
      this.endDateFilter$,
      this.resultFilter$,
      this.tournamentFilter$
    ).subscribe((filterChangeSingal) => {
      this.getTableData$(this.paginator.pageIndex + 1,
        this.paginator.pageSize).subscribe((data) => {
          this.gameData = data;
        });
    });

    this.paginator.page
      .pipe(
        startWith({}),
        tap(() => {
          this.isLoading = true;
          this.cd.detectChanges();
          this.store.dispatch(changePage({ newPage: this.paginator.pageIndex + 1 }))

        }),
        switchMap(() => {
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((data) => {
          if (data == null) return [];
          this.totalData = this.totalData;
          this.isLoading = false;
          this.cd.detectChanges();
          return data
        })
      )
      .subscribe((data) => {
        this.gameData = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.gameData);
      });
  }


  ngOnInit(): void {
    this.store.select(selectRoles)
      .subscribe((roles) => {
        this.isAdmin = roles.includes(Role.Admin);
        console.log(this.isAdmin);
      })
    this.store.dispatch(GameActions.loadNumberOfGames());
    this.store.select(selectNumberOfGames)
      .subscribe((num) => {
        this.totalData = num;
        this.cd.detectChanges();
      });

    if (this.isAdmin) {
      this.displayedColumns.push('deleteGame');
    }
  }

  getResult(game: Game): string {
    if (game.winnerId == game.whitePlayer.id) {
      return "1-0";
    } else if (game.winnerId == game.blackPlayer.id) {
      return "0-1";
    } else {
      return "1/2-1/2";
    }
  }



  playerClicked(player: Player) {
    if (player) {
      this.openPlayerInfoDialog(player);
    }
  }

  openPlayerInfoDialog(player: Player) {
    const dialogRef = this.dialog.open(PlayerInfoComponent, {
      data: player
    })
  }

  sortData(sort: Sort) {
    const data = this.gameData;
    if (!sort.active || sort.direction === '') {
      this.sorted = false;
      return;
    }
    this.gameData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'whitePlayer':
          return this.compare(a.whitePlayer.firstName + a.whitePlayer.lastName, b.whitePlayer.firstName + b.whitePlayer.lastName, isAsc);
        case 'blackPlayer':
          return this.compare(a.blackPlayer.firstName + a.blackPlayer.lastName, b.blackPlayer.firstName + b.blackPlayer.lastName, isAsc);
        case 'result':
          return this.compare(this.getResult(a), this.getResult(b), isAsc);
        case 'timeControl':
          return this.compare(a.startingTime.toString() + a.increment.toString(), b.startingTime.toString() + b.increment.toString(), isAsc);
        case 'date':
          return this.compare(a.gameDate.toString(), b.gameDate.toString(), isAsc);
        case 'tournament':
          return this.compare(a.tournament.tournamentName, b.tournament.tournamentName, isAsc);
        default:
          return 0;
      }
    })
    this.dataSource = new MatTableDataSource(this.gameData);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  gameSelected(game: Game) {
    this.store.dispatch(GameActions.selectGame({ game }));
    this.store.dispatch(GameActions.setCurrentGameMove({ moveNum: -1 }));
    this.router.navigateByUrl(`/gameView/${game.id}`);
  }

  deleteGame(game: Game) {
    this.store.dispatch(GameActions.deleteGame({ id: game.id }));
    this.ngAfterViewInit();
    this.totalData--;
  }
}
