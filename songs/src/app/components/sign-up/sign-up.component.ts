import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SignUpDto } from 'src/app/models/signUpDto';
import { User } from 'src/app/models/user';
import * as auth from '../../store/auth/auth.action';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { selectRegistered } from 'src/app/store/auth/auth.selector';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignUpDto = new SignUpDto();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(): void {
    if (!this.user.isPlayer) {
      this.user = {
        ...this.user,
        isPlayer: false,
        classicalElo: 0,
        rapidElo: 0,
        blitzElo: 0,
      }
    }
    this.store.dispatch(auth.signUp({ userDto: this.user }));

    this.store.select(selectRegistered)
      .subscribe((mail) => {
        if (mail.length != 0) {
          this.snackBar.open(`Confirm your registration on: ${mail} to procede.`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'assertive',
          })
        }
      })
  }

}