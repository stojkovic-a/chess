import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, startWith, switchMap, tap } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { userDto } from 'src/app/models';
import { deleteSelectedUser, loadNumberOfUsers, loadUsersPagination, selectUser } from 'src/app/store/chess.action';
import { selectDeletedUser, selectNumberOfUsers, selectSelectedUserdId, selectUsersPagination } from 'src/app/store/chess.selector';

@Component({
  selector: 'app-administration-user-delete',
  templateUrl: './administration-user-delete.component.html',
  styleUrls: ['./administration-user-delete.component.scss']
})
export class AdministrationUserDeleteComponent implements OnInit {
  selectedUserId: number;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
  }
  onSubmit() {
    // this.store.dispatch(selectUserToDelete({ userId: this.selectedUserId }));
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
  ngOnInit(): void {
    this.store.select(selectSelectedUserdId)
      .subscribe(id =>
        this.selectedUserId = id
      )
  }
}
