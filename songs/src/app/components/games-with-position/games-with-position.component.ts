import { Component, Input, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Game } from 'src/app/models';
import { loadGamesByPosition } from 'src/app/store/chess.action';
import { selectGamesByPosition, selectNumberOfGamesWithPos } from 'src/app/store/chess.selector';
import * as ChessActions from '../../store/chess.action';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { GamePosNum } from 'src/app/interfaces';
import { Router } from '@angular/router';




@Component({
  selector: 'app-games-with-position',
  templateUrl: './games-with-position.component.html',
  styleUrls: ['./games-with-position.component.scss']
})
export class GamesWithPositionComponent implements OnInit {

  @Input() id;

  @Input() currentFen: string;


  @ViewChild('paginator') paginator!: MatPaginator;

  games: Game[] = [];
  moveNums: number[] = [];
  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<GamePosNum>();
  data: GamePosNum[];
  isLoading = true;

  displayedColumns: string[] = [
    'whitePlayer',
    'result',
    'blackPlayer',
  ];
  pageSizes = [5];

  selectedId: number | null = null;

  constructor(
    private store: Store<AppState>,
    private router: Router
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
        switchMap(() => {
          return this.getTableData$(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)))
        }),
        map((data) => {
          if (data == null) return [];
          this.isLoading = false;
          return data;
        })
      )
      .subscribe((data) => {
        this.data = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  getTableData$(pageNumber: number, pageSize: number) {
    this.store.dispatch(loadGamesByPosition
      ({
        position: this.currentFen,
        pageNum: pageNumber,
        pageSize: pageSize
      }));
    return this.store.select(selectGamesByPosition)

  }

  ngOnInit(): void {
    this.getAndSetNumberOfGames();
    this.store.select(selectNumberOfGamesWithPos)
      .subscribe((num) => {
        this.totalData = num;
        this.paginator.length = num;
        console.log(num);
      });
  }

  getAndSetNumberOfGames() {
    console.log("neko stalno poziva ovu fju");
    this.store.dispatch(ChessActions.loadNumberOfGamesWithPos({ position: this.currentFen }));
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("PROBLEM IS HERE");
    if (changes['currentFen'] && changes['currentFen'].currentValue !== changes['currentFen'].previousValue) {
      this.currentPage = 0;
      this.paginator.pageIndex = 0;
      this.getAndSetNumberOfGames();
      this.store.dispatch(loadGamesByPosition
        ({
          position: this.currentFen,
          pageNum: this.paginator.pageIndex,
          pageSize: this.paginator.pageSize
        }));

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

  // gameSelected(game: Game, index: number) {
  //   this.store.dispatch(ChessActions.selectGame({ game }));
  //   this.store.dispatch(
  //     ChessActions.setCurrentGameMove(
  //       { moveNum: this.moveNums[index] - 1 }
  //     ));
  //   console.log('sve hoce');
  // }

  clickedRow(row) {
    console.log(row);
    this.store.dispatch(ChessActions.selectGame({ game: row.games }));
    this.store.dispatch(
      ChessActions.setCurrentGameMove(
        { moveNum: row.moveNums - 1 }
      ));
    this.selectedId = row.games.id;
    this.id = row.games.id;
    this.router.navigateByUrl(`/gameView/${row.games.id}`);

  }

  isSelectedGame(row) {
    return (row.games.id === this.selectedId || row.games.id === parseInt(this.id));
  }
}
