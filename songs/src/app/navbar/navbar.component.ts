import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectFirstName } from '../store/auth/auth.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name$: Observable<string>;
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
    this.name$ = this.store.select(selectFirstName);
    this.name$.subscribe(x => console.log(x));
  }

}
