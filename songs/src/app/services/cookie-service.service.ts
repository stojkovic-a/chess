// cookie.service.ts
import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private ngxCookieService: NgxCookieService) { }

  setAuthenticationToken(token: string): void {
    // Set the token as an HTTP cookie with HttpOnly and Secure flags
    // Calculate the expiration date (7 days from now)
    const expirationDate = dayjs();
    expirationDate.add(7, 'days')

    this.ngxCookieService.set('authenticationToken', token, expirationDate.toDate(), '/', "localhost", true, 'Strict');
  }

  getAuthenticationToken(): string | undefined {
    return this.ngxCookieService.get('authenticationToken');
  }

  removeAuthenticationToken(): void {
    this.ngxCookieService.delete('authenticationToken', '/', "localhost", true);
  }
}
