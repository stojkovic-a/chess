import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { SignUpDto } from 'src/app/models/signUpDto';
import { User } from 'src/app/models/user';
import * as auth from '../../store/auth/auth.action';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignUpDto = new SignUpDto();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.user);
    this.store.dispatch(auth.signUp({ userDto: this.user }));

  }

}