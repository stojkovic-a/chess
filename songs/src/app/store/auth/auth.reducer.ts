// src/app/auth/store/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as fromAuth from './auth.action';
import { User } from 'src/app/models/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = createReducer(
  initialState,
  on(fromAuth.signIn, (state) => ({ ...state, loading: true })),
  on(fromAuth.signInSuccess, (state, { user }) => ({ ...state, user, loading: false, error: null })),
  on(fromAuth.signInFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: AuthState | undefined, action: any) {
  return authReducer(state, action);
}
