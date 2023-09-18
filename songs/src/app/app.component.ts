import { Component, OnInit } from '@angular/core';
import { CookieService } from './services/cookie.service/cookie-service.service';
import jwtDecode from 'jwt-decode';
import { AuthService } from './services/auth.service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chess';
  constructor(
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
    this.authService.loadUserFromCookies();
  }
}
