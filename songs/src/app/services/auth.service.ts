// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { SignUpDto } from '../models/signUpDto';
import { CookieService } from './cookie-service.service';
import { Tokens } from '../interfaces';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.api}auth/local`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
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
}
