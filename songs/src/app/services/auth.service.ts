// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';
import { SignUpDto } from '../models/signUpDto';
import { CookieService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.api}/local`;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  signIn(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>(`${this.baseUrl}/signin`, body).pipe(
      map((response) => {
        const token = response.token;
        if (token) this.cookieService.setAuthenticationToken(token);
        else {
          //TODO: THROW EXCEP HERE
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
    const token = this.cookieService.getAuthenticationToken();

    return !!token;
  }
}
