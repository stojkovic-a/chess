import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user'; // Define your User model
import { SignUpDto } from 'src/app/models/signUpDto';

// Action for signing in
export const signIn = createAction(
    '[Auth] Sign In',
    props<{ username: string; password: string }>()
);

export const signInSuccess = createAction(
    '[Auth] Sign In Success',
    props<{ user: User }>()
);

export const signInFailure = createAction(
    '[Auth] Sign In Failure',
    props<{ error: string }>()
);

// Action for signing up
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
