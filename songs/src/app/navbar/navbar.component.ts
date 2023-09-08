import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectUserData } from '../store/auth/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user$: Observable<User | null>;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUserData);
  }
  ngOnInit(): void {
  }

}
