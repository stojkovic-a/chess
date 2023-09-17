// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, of, throwError } from 'rxjs';
import { CookieService } from './services/cookie-service.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { selectToken } from './store/auth/auth.selector';
import jwtDecode from 'jwt-decode';
import { refreshTokens, signOut } from './store/auth/auth.action';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

//TODO: Move file to appropriate place in project structure
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    exceptionRoute: string[] = [
        `${environment.api}auth/local`,
        `${environment.api}auth/refresh`
    ]

    constructor(
        private store: Store<AppState>,
        private cookieService: CookieService,
        private router: Router
    ) { }


    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigateByUrl(`/log-in`);

            return of(err.message);
        }
        else if (err.status === 403) {
            this.router.navigateByUrl('/');
        }
        return throwError(() => err);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const isExceptionRooute = this.exceptionRoute.some((route) =>
            request.url.includes(route)
        );
        if (isExceptionRooute) {
            return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
        }


        // Get the authentication token from the cookie
        let accessToken = "";
        let refreshToken = "";

        this.store.select(selectToken)
            .subscribe((tokens) => {
                accessToken = tokens.access_token;
                refreshToken = tokens.refresh_token;
            })

        // Clone the request and add the Bearer token to the headers if the token is present
        const accesExp = jwtDecode<{ exp: number }>(accessToken).exp;

        if (accessToken.length != 0 && Date.now() < accesExp * 1000) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } else {
            if (refreshToken.length != 0) {
                const refreshExp = jwtDecode<{ exp: number }>(refreshToken).exp;
                if (Date.now() < refreshExp * 1000) {
                    // refresh token not expired, access token expired, send refresh 
                    this.store.dispatch(refreshTokens({ refreshToken: refreshToken }));
                    this.store.select(selectToken)
                        .subscribe(tokens => {
                            this.cookieService.setTokens(tokens);
                            request = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${tokens.access_token}`,
                                },
                            });

                            // return next.handle(request);
                        })
                }
            } else {
                // access token expired, refresh expired or not in store
                this.store.dispatch(signOut());
                return EMPTY
            }
        }


        return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
    }
}
