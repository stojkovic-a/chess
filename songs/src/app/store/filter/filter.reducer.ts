import { createAction, createReducer, on } from "@ngrx/store";
import * as FilterActions from './filter.action'
import * as GameActions from '../game/game.action'
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";
import { Filter, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto, Game } from "../../models";
import { Platform } from "@angular/cdk/platform";
import { act } from "@ngrx/effects";
import { GamePosNum } from "../../interfaces";


export interface FilterState extends EntityState<Filter> {
    players: string[];
    tournaments: string[];
    selectedWhitePlayerFilter: string;
    selectedBlackPlayerFilter: string;
    selectedTournamentFilter: string;
    selectedResultFilter: string,
    selectedStartDateFilter: Date | null,
    selectedEndDateFilter: Date,
}
const filterAdapter = createEntityAdapter<Filter>();


export const initialFilterState: FilterState = filterAdapter.getInitialState({
    players: [],
    tournaments: [],
    selectedWhitePlayerFilter: '',
    selectedBlackPlayerFilter: '',
    selectedTournamentFilter: '',
    selectedResultFilter: '',
    selectedEndDateFilter: new Date(Date.now()),
    selectedStartDateFilter: null,

})

export const filterReducer = createReducer(
    initialFilterState,
    on(FilterActions.loadFiltersSuccess, (state, { filters }) =>
    ({
        ...state,
        players: filters.playerNames,
        tournaments: filters.tournamentNames
    })
    ),
    on(FilterActions.selectWhitePlayerFilter, (state, { fullName }) =>
    ({
        ...state,
        selectedWhitePlayerFilter: fullName
    })
    ),
    on(FilterActions.selectBlackPlayerFilter, (state, { fullName }) =>
    ({
        ...state,
        selectedBlackPlayerFilter: fullName
    })
    ),
    on(FilterActions.selectStartDateFilter, (state, { startDate }) =>
    ({
        ...state,
        selectedStartDateFilter: startDate
    })
    ),
    on(FilterActions.selectEndDateFilter, (state, { endDate }) =>
    ({
        ...state,
        selectedEndDateFilter: endDate
    })
    ),
    on(FilterActions.selectResultFilter, (state, { result }) =>
    ({
        ...state,
        selectedResultFilter: result
    })
    ),
    on(FilterActions.selectTournamentFilter, (state, { tournament }) =>
    ({
        ...state,
        selectedTournamentFilter: tournament
    })
    )
)