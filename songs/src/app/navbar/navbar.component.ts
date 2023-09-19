import { Component, OnInit, booleanAttribute } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { selectFirstName, selectRoles } from '../store/auth/auth.selector';
import { signOut } from '../store/auth/auth.action';
import { AuthService } from '../services/auth.service/auth.service';
import { Role } from '../enums';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name$: Observable<string>;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) {

  }
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.name$ = this.store.select(selectFirstName);
    // this.name$.subscribe(x => console.log(x));
    this.store.select(selectRoles)
      .subscribe((roles) => {
        this.isAdmin = roles.includes(Role.Admin);
      })
  }
  logOut() {
    this.store.dispatch(signOut());
  }
}
