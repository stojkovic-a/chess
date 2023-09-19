import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthService } from 'src/app/services/auth.service/auth.service';
import { selectFirstName } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isLoggedIn = false;
  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
  ) {

  }
  ngOnInit(): void {
    this.store.select(selectFirstName)
      .subscribe(firstName => {
        this.isLoggedIn = (firstName.length != 0);
      })
  }
}
