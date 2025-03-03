import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { deleteSelectedUser } from 'src/app/store/user/user.action';
import { selectDeletedUser, selectSelectedUserdId } from 'src/app/store/user/user.selector';

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
