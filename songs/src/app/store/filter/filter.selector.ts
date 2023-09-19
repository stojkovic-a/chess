import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";

export const selectFilterFeature = createSelector(
    (state: AppState) => state.filters,
    (filters) => filters
)

export const selectPlayerFilters = createSelector(
    selectFilterFeature,
    (filters) => filters.players
)

export const selectTournamentFilters = createSelector(
    selectFilterFeature,
    (filters) => filters.tournaments
)

export const selectWhitePlayerFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedWhitePlayerFilter
)

export const selectBlackPlayerFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedBlackPlayerFilter
)

export const selectStartDateFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedStartDateFilter
)

export const selectEndDateFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedEndDateFilter
)

export const selectTournamentFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedTournamentFilter
)

export const selectResultFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedResultFilter
)

export const selectAllFilters = createSelector(
    selectFilterFeature,
    (filter) => {
        filter.selectedWhitePlayerFilter,
            filter.selectedBlackPlayerFilter,
            filter.selectedResultFilter,
            filter.selectedStartDateFilter,
            filter.selectedEndDateFilter,
            filter.selectedTournamentFilter
    }
)