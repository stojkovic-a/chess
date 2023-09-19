import { createAction, props } from "@ngrx/store";
import { Filter } from "../../models";

export const loadFilters = createAction(
    "Load Filters",
)

export const loadFiltersSuccess = createAction(
    "Load Filters Success",
    props<{ filters: Filter }>()
)

export const selectWhitePlayerFilter = createAction(
    "Select White Player Filter",
    props<{ fullName: string }>()
)
export const selectBlackPlayerFilter = createAction(
    "Select Black Player Filter",
    props<{ fullName: string }>()
)

export const selectResultFilter = createAction(
    "Select Result Filter",
    props<{ result: string }>()
)

export const selectStartDateFilter = createAction(
    "Select Start Date Filter",
    props<{ startDate: Date }>()
)
export const selectEndDateFilter = createAction(
    "Select End Date Filter",
    props<{ endDate: Date }>()
)
export const selectTournamentFilter = createAction(
    "Select Tournament Filter",
    props<{ tournament: string }>()
)