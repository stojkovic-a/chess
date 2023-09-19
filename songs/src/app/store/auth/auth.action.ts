import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user'; 
import { SignUpDto } from 'src/app/models/signUpDto';
import { Tokens } from 'src/app/interfaces';
import { Role } from 'src/app/enums';

export const signIn = createAction(
    '[Auth] Sign In',
    props<{ username: string; password: string }>()
);

export const signInSuccess = createAction(
    '[Auth] Sign In Success',
    props<{ tokens: Tokens }>()
);

export const signInFailure = createAction(
    '[Auth] Sign In Failure',
    props<{ error: string }>()
);

export const signUp = createAction(
    '[Auth] Sign Up',
    props<{ userDto: SignUpDto }>()
);

export const signUpSuccess = createAction(
    '[Auth] Sign Up Success',
    props<{ user: User }>()
);

export const signUpFailure = createAction(
    '[Auth] Sign Up Failure',
    props<{ error: string }>()
);

export const loadUserFromCookie = createAction(
    '[Auth] Load User From Cookie',
    props<{ tokens: Tokens, firstName: string, roles: Role[] }>()
)

export const refreshTokens = createAction(
    '[Auth] Refresh Tokens',
    props<{ refreshToken: string }>()
)

export const refreshTokensSuccess = createAction(
    '[Auth] Refresh Tokens Success',
    props<{ tokens: Tokens }>()
)

export const signOut=createAction(
    '[Auth] SignOut'
)

export const signOutSuccess=createAction(
    '[Auth] SignOut Success'
)