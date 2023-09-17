// cookie.service.ts
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { Tokens } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) { }

  setTokens(tokens: Tokens): void {
    // Set the token as an HTTP cookie with HttpOnly and Secure flags
    // Calculate the expiration date (7 days from now)
   


    this.ngxCookieService.set('accessToken', tokens.access_token,0.01042 , '/', 'localhost', false, 'Lax');
    this.ngxCookieService.set('refreshToken', tokens.refresh_token,7, '/', 'localhost', false, 'Lax');

  }

  getAccessToken(): string | undefined {
    return this.ngxCookieService.get('accessToken');
  }

  getRefreshToken(): string | undefined {
    return this.ngxCookieService.get('refreshToken');
  }

  removeTokens(): void {
    this.ngxCookieService.delete('accessToken');
    this.ngxCookieService.delete('refreshToken');
  }
}
