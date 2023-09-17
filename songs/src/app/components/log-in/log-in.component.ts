import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import * as auth from '../../store/auth/auth.action';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { selectError } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  user: User = new User();

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.store.select(selectError)
      .subscribe((err) => {
        if (err) {
          this.snackBar.open(`Incorrect credentials`, `OK`, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            politeness: 'assertive'
          })
        } else {
          if (this.authService.isLoggedIn()) {
            console.log('hmmmm?');
            this.router.navigateByUrl('/home');
          }
        }
      })

  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    //TODO: Sredi null check (izbaci cast as string)
    this.store.dispatch(auth.signIn({ username: payload.email as string, password: payload.password as string }));
  }
}
