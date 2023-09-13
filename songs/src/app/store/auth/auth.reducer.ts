// src/app/auth/store/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as fromAuth from './auth.action';
import { User } from 'src/app/models/user';
import { Tokens } from 'src/app/interfaces';
import { Role } from 'src/app/enums';
import jwt_decode from "jwt-decode";
import jwtDecode from 'jwt-decode';



export interface AuthState {
  tokens: Tokens;
  firstName: string;
  roles: Role[];
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  tokens: null,
  firstName: "",
  roles: [],
  loading: false,
  error: null,
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
  on(fromAuth.signInFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}
