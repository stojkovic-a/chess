import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { userDto } from 'src/app/models';
import { DateService } from 'src/app/services/date.service/date.service';
import { updateUser } from 'src/app/store/user/user.action';
import { selectSelectedUser, selectUserUpdateId } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-administration-user-update',
  templateUrl: './administration-user-update.component.html',
  styleUrls: ['./administration-user-update.component.scss']
})
export class AdministrationUserUpdateComponent implements OnInit {

  user: userDto = {
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    email: "",
    representingCountry: "",
    isPlayer: false,
    classicalElo: 0,
    rapidElo: 0,
    blitzElo: 0,
    isAdmin: false
  };

  dateFormat: string;

  constructor(
    private store: Store<AppState>,
    private snackBar: MatSnackBar,
    private dateService: DateService
  ) {

  }


  ngOnInit(): void {
    this.store.select(selectSelectedUser)
      .subscribe(user => {
        if (user) {
          this.user = { ...user };
          this.dateFormat = this.dateService.formatDateDash(user.dateOfBirth)
        }
      })
  }

  onSubmit() {
    this.user = {
      ...this.user,
      dateOfBirth: new Date(this.dateFormat)
    }
    this.store.dispatch(updateUser({ user: this.user }));
    this.store.select(selectUserUpdateId)
      .subscribe((id) => {
        if (id) {
          this.snackBar.open(`Successfully updated a user: ${id}`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'polite',
          })
        }
      })
  }

}
