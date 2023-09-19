import { createReducer, on } from '@ngrx/store';
import * as fromAuth from './auth.action';
import { Tokens } from 'src/app/interfaces';
import { Role } from 'src/app/enums';
import jwtDecode from 'jwt-decode';



export interface AuthState {
  tokens: Tokens;
  firstName: string;
  roles: Role[];
  loading: boolean;
  error: string | null;
  registered: string
}

export const initialState: AuthState = {
  tokens: null,
  firstName: "",
  roles: [],
  loading: false,
  error: null,
  registered: ""
};

const authReducer = createReducer(
  initialState,
  on(fromAuth.signIn, (state) => ({ ...state, loading: true })),
  on(fromAuth.signInSuccess, (state, { tokens }) =>
  ({
    ...state,
    tokens,
    firstName: jwtDecode<{ firstName: string }>(tokens.access_token).firstName,
    loading: false,
    error: null,
    roles: jwtDecode<{ roles: Role[] }>(tokens.access_token).roles,
  })),
  on(fromAuth.signInFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(fromAuth.loadUserFromCookie, (state, { tokens, firstName, roles }) =>
  ({
    ...state,
    tokens: tokens,
    firstName: firstName,
    roles: roles,
  })
  ),
  on(fromAuth.refreshTokensSuccess, (state, { tokens }) =>
  ({
    ...state,
    tokens: tokens
  })
  ),
  on(fromAuth.signOutSuccess, (state) =>
  ({
    ...state,
    ...initialState
  })
  ),
  on(fromAuth.signUpSuccess, (state, { user }) =>
  ({
    ...state,
    registered: user.email
  })
  )
);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}
