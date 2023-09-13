import { createAction, createReducer, on } from "@ngrx/store";
import * as Actions from './chess.action';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";
import { Filter, Player } from "../models";
import { Game } from "../models";
import { Platform } from "@angular/cdk/platform";
import { act } from "@ngrx/effects";
import { GamePosNum } from "../interfaces";


export interface PageState extends EntityState<number> {
    pageNumber: number;
    numberOfGames: number
}

export interface PlayerState extends EntityState<Player> {
    selectedPlayer: Player | null
}

export interface GameState extends EntityState<Game> {
    selectedGame: Game
    gameWithPositions: Game
    gamesByPositionWithMove: GamePosNum[]
    currentMoveNumber: number
    gameWithPosNumber: number
}

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
    on(Actions.loadFiltersSuccess, (state, { filters }) =>
    ({
        ...state,
        players: filters.playerNames,
        tournaments: filters.tournamentNames
    })
    ),
    on(Actions.selectWhitePlayerFilter, (state, { fullName }) =>
    ({
        ...state,
        selectedWhitePlayerFilter: fullName
    })
    ),
    on(Actions.selectBlackPlayerFilter, (state, { fullName }) =>
    ({
        ...state,
        selectedBlackPlayerFilter: fullName
    })
    ),
    on(Actions.selectStartDateFilter, (state, { startDate }) =>
    ({
        ...state,
        selectedStartDateFilter: startDate
    })
    ),
    on(Actions.selectEndDateFilter, (state, { endDate }) =>
    ({
        ...state,
        selectedEndDateFilter: endDate
    })
    ),
    on(Actions.selectResultFilter, (state, { result }) =>
    ({
        ...state,
        selectedResultFilter: result
    })
    ),
    on(Actions.selectTournamentFilter, (state, { tournament }) =>
    ({
        ...state,
        selectedTournamentFilter: tournament
    })
    )
)

const pageAdapter = createEntityAdapter<number>();



export const initialPageState: PageState = pageAdapter.getInitialState({
    pageNumber: 1,
    numberOfGames: 0,
});

const playerAdapter = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = playerAdapter.getInitialState({
    selectedPlayer: null
})

const gameAdapter = createEntityAdapter<Game>();
export const initialGameState: GameState = gameAdapter.getInitialState({
    selectedGame: null,
    gameWithPositions: null,
    gamesByPositionWithMove: [],
    currentMoveNumber: -1,
    gameWithPosNumber: 0
});

export const pageReducer = createReducer(
    initialPageState,
    on(Actions.loadNumberOfGameSuccess, (state, { numberOfGames }) =>
    ({
        ...state,
        numberOfGames: numberOfGames,
    })
    ),
    on(Actions.changePage, (state, { newPage }) =>
    ({
        ...state,
        pageNumber: newPage
    })
    )
);


export const playerReducer = createReducer(
    initialPlayerState,
    on(Actions.loadPlayerSuccess, (state, { player }) =>
        playerAdapter.setOne(player, state)
    ),
    on(Actions.selectPlayer, (state, { player }) => {
        return {
            ...state,
            selectedPlayer: player
        }
    })
)

export const gameReducer = createReducer(
    initialGameState,
    on(Actions.loadGamesSuccess, (state, { games }) =>
        gameAdapter.setAll(games, state),

    ),
    on(Actions.selectGame, (state, { game }) =>
    ({
        ...state,
        selectedGame: game
    })
    ),
    on(Actions.loadGameWithPositionsSuccess, (state, { game }) =>
    ({
        ...state,
        gameWithPositions: game
    })
    ),
    on(Actions.loadGamesByPositionSuccess, (state, combination) =>
    ({
        ...state,
        gamesByPositionWithMove: combination.combination
    })
    ),
    on(Actions.setCurrentGameMove, (state, { moveNum }) =>
    ({
        ...state,
        currentMoveNumber: moveNum
    })
    ),
    on(Actions.loadNumberOfGamesWithPosSuccess, (state, { numberOfGamesWithPos }) =>
    ({
        ...state,
        gameWithPosNumber: numberOfGamesWithPos
    })
    )
)
