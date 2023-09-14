import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { userDto } from 'src/app/models';
import { deleteSelectedUser, loadNumberOfUsers, loadUsersPagination, selectUserToDelete } from 'src/app/store/chess.action';
import { selectDeletedUser, selectNumberOfUsers, selectUsersPagination } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-administration-user-delete',
  templateUrl: './administration-user-delete.component.html',
  styleUrls: ['./administration-user-delete.component.scss']
})
export class AdministrationUserDeleteComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  users: userDto[];

  totalData = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<userDto>();
  isLoading = true;

  selectedUserId: number;

  pageSizes = [10];
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
    private snackBar: MatSnackBar
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
    this.store.dispatch(selectUserToDelete({ userId: user.id }));
    this.selectedUserId = user.id;
  }

  onSubmit() {
    this.store.dispatch(selectUserToDelete({ userId: this.selectedUserId }));
    this.store.dispatch(deleteSelectedUser({ userId: this.selectedUserId }));
    this.store.select(selectDeletedUser)
      .subscribe(userId => {
        console.log(userId);
        if (userId) {
          this.snackBar.open(`Successfully deleted a user: ${userId}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })

  }
}
