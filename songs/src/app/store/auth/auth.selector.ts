import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import jwt_decode from "jwt-decode";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectToken = createSelector(
    authFeature,
    (state) => state?.user?.token,
);
export const selectIsAuth = createSelector(
    authFeature,
    (state) => !!state?.user?.token,
);
export const selectUserData = createSelector(
    authFeature,
    (state) => state.user
);