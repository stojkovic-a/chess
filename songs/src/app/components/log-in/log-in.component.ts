import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';
import * as fromAuth from '../../store/auth/auth.action';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  user: User = new User();

  constructor(private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    //TODO: Sredi null check (izbaci cast as string)
    this.store.dispatch(fromAuth.signIn({ username: payload.email as string, password: payload.password as string }));
  }
}
