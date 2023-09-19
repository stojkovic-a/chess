import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export const authFeature = createFeatureSelector<AuthState>("auth");

export const selectToken = createSelector(
    authFeature,
    (state) => state.tokens
);

export const selectFirstName = createSelector(
    authFeature,
    (state) => state.firstName
)

export const selectRoles = createSelector(
    authFeature,
    (state) => state.roles
)

export const selectError = createSelector(
    authFeature,
    (state) => state.error
)

export const selectRegistered = createSelector(
    authFeature,
    (state) => state.registered
)

// export const selectIsAuth = createSelector(
//     authFeature,
//     (state) => !!state?.user?.token,
// );
// export const selectUserData = createSelector(
//     authFeature,
//     (state) => state.user
// );