import { Component, OnInit } from '@angular/core';
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
