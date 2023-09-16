import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, merge, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { userDto } from 'src/app/models';
import { loadNumberOfUsers, loadUsersPagination, selectUser } from 'src/app/store/chess.action';
import { selectDeletedUser, selectNumberOfUsers, selectUsersPagination } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  selectedUserId: number | null = null;

  users: userDto[];

  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<userDto>();
  isLoading = true;

  // selectedUserId: number;

  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastName",
    "email",
    "date",
    "representingCountry",
    "isPlayer",
    "classicalElo",
    "rapidElo",
    "blitzElo"
  ]
  pageSize = [10];

  constructor(
    private store: Store<AppState>,
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
        switchMap(() => this.getTableData$(
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
        this.users = data;
        this.paginator.length = this.totalData;
        this.dataSource = new MatTableDataSource(this.users);
      });

    merge(
      this.store.select(selectDeletedUser),
      this.store.select(selectDeletedUser)
    ).subscribe(() => {
      this.store.dispatch(loadNumberOfUsers());
      this.getTableData$(this.paginator.pageIndex, this.paginator.pageSize);
    })
  }

  getTableData$(pageNumber: number, pageSize: number): Observable<userDto[]> {
    this.store.dispatch(loadUsersPagination({
      pageIndex: pageNumber,
      pageSize: pageSize,
    }));

    return this.store.select(selectUsersPagination);
  }

  ngOnInit(): void {
    this.getNumberOfUsers();
    this.store.select(selectNumberOfUsers)
      .subscribe((num) => {
        this.totalData = num;
        this.paginator.length = num;
      })
  }

  getNumberOfUsers() {
    this.store.dispatch(loadNumberOfUsers());
  }

  clickedRow(user) {
    this.store.dispatch(selectUser({ userId: user.id }));
    this.selectedUserId = user.id;
  }

  isSelectedUser(user: userDto) {
    return user.id === this.selectedUserId;
  }
}
