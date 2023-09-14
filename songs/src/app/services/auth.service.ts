// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { SignUpDto } from '../models/signUpDto';
import { CookieService } from './cookie-service.service';
import { Tokens } from '../interfaces';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Role } from '../enums';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { loadUserFromCookie, refreshTokens } from '../store/auth/auth.action';
import { selectToken } from '../store/auth/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.api}auth/local`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  signIn(email: string, password: string): Observable<Tokens> {
    const body = { email, password };
    return this.http.post<Tokens>(`${this.baseUrl}/signin`, body).pipe(
      map((response) => {
        const tokens: Tokens = response;
        if (tokens) {
          this.cookieService.setTokens(tokens);
          this.router.navigateByUrl('/');
        }
        else {
          //TODO: THROW EXCEP HERE SNACKBAR
        }
        return response;
      })
    );
  }

  signUp(dto: SignUpDto): Observable<User> {
    const body = dto;
    return this.http.post<User>(`${this.baseUrl}/signup`, body);
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.getRefreshToken();

    return !!token;
  }

  loadUserFromCookies() {
    const accessToken = this.cookieService.getAccessToken();
    const refreshToken = this.cookieService.getRefreshToken();
    if (accessToken.length === 0) {
      this.store.dispatch(refreshTokens({ refreshToken: refreshToken }));
      this.store.select(selectToken)
        .subscribe(tokens => {
          this.cookieService.setTokens(tokens);
        }
        )
    }
    const firstName = jwtDecode<{ firstName: string }>(accessToken).firstName;
    const roles = jwtDecode<{ roles: Role[] }>(accessToken).roles;
    this.store.dispatch(loadUserFromCookie({ tokens: { access_token: accessToken, refresh_token: refreshToken }, firstName: firstName, roles: roles }))
  }

  refreshTokens(refreshToken: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${refreshToken}`);

    return this.http.post<Tokens>(environment.api + `auth/refresh`, null, {
      headers: headers
    });
  }
}
