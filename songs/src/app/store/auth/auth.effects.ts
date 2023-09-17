// src/app/auth/store/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromAuth from './auth.action';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuth.signIn),
            switchMap(({ username, password }) =>
                this.authService.signIn(username, password).pipe(
                    map((tokens) => fromAuth.signInSuccess({ tokens: tokens })),
                    catchError((error) => of(fromAuth.signInFailure({ error })))
                )
            )
        )
    );

    signUp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuth.signUp), // Listen for the signUp action
            switchMap(({ userDto }) =>
                this.authService.signUp(userDto).pipe( // Call the signUp method from your AuthService
                    map((user) => fromAuth.signUpSuccess({ user })), // Dispatch signUpSuccess on success
                    catchError((error) => of(fromAuth.signUpFailure({ error }))) // Dispatch signUpFailure on error
                )
            )
        )
    );

    refreskToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuth.refreshTokens),
            switchMap((token) =>
                this.authService.refreshTokens(token.refreshToken).pipe(
                    map((tokens) => {
                        return fromAuth.refreshTokensSuccess({ tokens: tokens })
                    }),
                    catchError((error) => of({ type: 'refresh error' }))
                )
            )
        )
    )

    signOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuth.signOut),
            tap(() => {
                this.router.navigateByUrl('/')
            }),
            switchMap(() =>
                this.authService.signout().pipe(
                    map(() => {
                        return fromAuth.signOutSuccess()
                    }),
                    catchError((error) => of({ type: 'signout error' }))
                )
            )
        )
    )

}
