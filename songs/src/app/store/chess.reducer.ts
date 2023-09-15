import { createAction, createReducer, on } from "@ngrx/store";
import * as Actions from './chess.action';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";
import { Filter, Player, Tournament, userDto } from "../models";
import { Game } from "../models";
import { Platform } from "@angular/cdk/platform";
import { act } from "@ngrx/effects";
import { GamePosNum } from "../interfaces";
import { Action } from "rxjs/internal/scheduler/Action";


export interface TournamentState extends EntityState<Tournament> {
    numberOfTournaments: number
    selectedTournamentId: number
    createdTournamentId: number
    deletedTournamentId: number
    updatedTournamentId: number
    addedPlayerTournament: { playerId: number, tournamentId: number }
    removedPlayerTournament: { playerId: number, tournamentId: number }
    addedGameTournament: { gameId: number, tournamentId: number }
    removedGameTournament: { gameId: number, tournamentId: number }
}
const tournamentAdapter = createEntityAdapter<Tournament>();

export const initialTournamentState: TournamentState = tournamentAdapter.getInitialState({
    numberOfTournaments: 0,
    selectedTournamentId: 0,
    createdTournamentId: 0,
    deletedTournamentId: 0,
    updatedTournamentId: 0,
    addedPlayerTournament: { playerId: 0, tournamentId: 0 },
    removedPlayerTournament: { playerId: 0, tournamentId: 0 },
    addedGameTournament: { gameId: 0, tournamentId: 0 },
    removedGameTournament: { gameId: 0, tournamentId: 0 },
})

export const tournamentReducer = createReducer(
    initialTournamentState,
    on(Actions.loadNumberOfTournamentsSuccess, (state, { numberOfTournaments }) =>
    ({
        ...state,
        numberOfTournaments: numberOfTournaments
    })
    ),
    on(Actions.loadTournamentsPaginationSuccess, (state, { tournamets }) =>
        tournamentAdapter.setAll(tournamets, state)
    ),
    on(Actions.selectTournament, (state, { tournamentId }) =>
    ({
        ...state,
        selectedTournamentId: tournamentId
    })
    ),
    on(Actions.CreateTournamentSuccess, (state, { id }) =>
    ({
        ...state,
        createdTournamentId: id
    })
    ),
    on(Actions.deleteSelectedTournamentSuccess, (state, { deletedId }) => {
        const updatedState = { ...state, deletedTournamentId: deletedId };
        return tournamentAdapter.removeOne(deletedId, updatedState);
    }),
    on(Actions.updateTournamentSuccess, (state, { tournamentId }) =>
    ({
        ...state,
        updatedTournamentId: tournamentId
    })
    ),
    on(Actions.addPlayerToTournamentSuccess, (state, { playerId, tournamentId }) =>
    ({
        ...state,
        addedPlayerTournament: { playerId: playerId, tournamentId: tournamentId }
    })
    ),
    on(Actions.removePlayerFromTournamentSuccess, (state, { playerId, tournamentId }) =>
    ({
        ...state,
        removedParticipation: { playerId: playerId, tournamentId: tournamentId }
    })
    ),
    on(Actions.addGameToTournamentSuccess, (state, { tournamentId, gameId }) =>
    ({
        ...state,
        addedGameTournament: { gameId: gameId, tournamentId: tournamentId }
    })
    ),
    on(Actions.removeGameFromTournamentSuccess, (state, { tournamentId, gameId }) =>
    ({
        ...state,
        removedGameTournament: { gameId: gameId, tournamentId: tournamentId }
    })
    ),

)

export interface PageState extends EntityState<number> {
    pageNumber: number;
    numberOfGames: number
}

export interface UserState extends EntityState<userDto> {
    numberOfUsers: number
    selectedUserId: number
    deletedUserId: number
    updatedUserId: number
}


const userAdapter = createEntityAdapter<userDto>();
export const initialUserState: UserState = userAdapter.getInitialState({
    numberOfUsers: 0,
    selectedUserId: 0,
    deletedUserId: 0,
    updatedUserId: 0,
});

export const userReducer = createReducer(
    initialUserState,
    on(Actions.loadNumberOfUsersSuccess, (state, { numberOfUsers }) =>
    ({
        ...state,
        numberOfUsers: numberOfUsers
    })
    ),
    on(Actions.loadUsersPaginationSuccess, (state, { users }) =>
        userAdapter.setAll(users, state)
    ),
    on(Actions.selectUser, (state, { userId }) =>
    ({
        ...state,
        selectedUserId: userId
    })
    ),
    on(Actions.deleteSelectedUserSuccess, (state, { deletedId }) => {
        const updatedState = { ...state, deletedUserId: deletedId };
        return userAdapter.removeOne(deletedId, updatedState);
    }),
    on(Actions.updateUserSuccess, (state, { userId }) =>
    ({
        ...state,
        updatedUserId: userId
    })
    )
)

export interface PlayerState extends EntityState<Player> {
    selectedPlayer: Player | null
}

export interface GameState extends EntityState<Game> {
    selectedGame: Game
    gameWithPositions: Game
    gamesByPositionWithMove: GamePosNum[]
    currentMoveNumber: number
    gameWithPosNumber: number
    createdGameId: number
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
    gameWithPosNumber: 0,
    createdGameId: null
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
    ),
    on(Actions.deleteGameSuccess, (state, { id }) =>
        gameAdapter.removeOne(id, state)
    ),
    on(Actions.createGameSuccess, (state, { id }) =>
    ({
        ...state,
        createdGameId: id
    })
    )
)
