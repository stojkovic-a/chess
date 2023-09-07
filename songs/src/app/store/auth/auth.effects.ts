// src/app/auth/store/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromAuth from './auth.action';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    signIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAuth.signIn),
            switchMap(({ username, password }) =>
                this.authService.signIn(username, password).pipe(
                    map((user) => fromAuth.signInSuccess({ user })),
                    catchError((error) => of(fromAuth.signInFailure({ error })))
                )
            )
        )
    );
}
