import { createAction, createReducer, on } from "@ngrx/store";
import * as TournamentActions from './tournament.action'
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";
import { Filter, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto, Game } from "../../models";
import { Platform } from "@angular/cdk/platform";
import { act } from "@ngrx/effects";
import { GamePosNum } from "../../interfaces";



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
    on(TournamentActions.loadNumberOfTournamentsSuccess, (state, { numberOfTournaments }) =>
    ({
        ...state,
        numberOfTournaments: numberOfTournaments
    })
    ),
    on(TournamentActions.loadTournamentsPaginationSuccess, (state, { tournamets }) =>
        tournamentAdapter.setAll(tournamets, state)
    ),
    on(TournamentActions.selectTournament, (state, { tournamentId }) =>
    ({
        ...state,
        selectedTournamentId: tournamentId
    })
    ),
    on(TournamentActions.CreateTournamentSuccess, (state, { id }) =>
    ({
        ...state,
        createdTournamentId: id
    })
    ),
    on(TournamentActions.deleteSelectedTournamentSuccess, (state, { deletedId }) => {
        const updatedState = { ...state, deletedTournamentId: deletedId };
        return tournamentAdapter.removeOne(deletedId, updatedState);
    }),
    on(TournamentActions.updateTournamentSuccess, (state, { tournamentId }) =>
    ({
        ...state,
        updatedTournamentId: tournamentId
    })
    ),
    on(TournamentActions.addPlayerToTournamentSuccess, (state, { playerId, tournamentId }) =>
    ({
        ...state,
        addedPlayerTournament: { playerId: playerId, tournamentId: tournamentId }
    })
    ),
    on(TournamentActions.removePlayerFromTournamentSuccess, (state, { playerId, tournamentId }) =>
    ({
        ...state,
        removedParticipation: { playerId: playerId, tournamentId: tournamentId }
    })
    ),
    on(TournamentActions.addGameToTournamentSuccess, (state, { tournamentId, gameId }) =>
    ({
        ...state,
        addedGameTournament: { gameId: gameId, tournamentId: tournamentId }
    })
    ),
    on(TournamentActions.removeGameFromTournamentSuccess, (state, { tournamentId, gameId }) =>
    ({
        ...state,
        removedGameTournament: { gameId: gameId, tournamentId: tournamentId }
    })
    ),

)

export interface GameTournamentState extends EntityState<number> {
    numberOfGameTournaments: number
    gameTournamentIds: GameTournamentIds[]
}

const gameTournamentAdapter = createEntityAdapter<number>();

export const initialGameTournamentState: GameTournamentState = gameTournamentAdapter.getInitialState({
    numberOfGameTournaments: 0,
    gameTournamentIds: []
})

export const gameTournamentReducer = createReducer(
    initialGameTournamentState,
    on(TournamentActions.loadNumberOfGameTournamentsSuccess, (state, { num }) =>
    ({
        ...state,
        numberOfGameTournaments: num
    })
    ),
    on(TournamentActions.loadTournamentGamePaginationSuccess, (state, { tournamentGameIds }) =>
    ({
        ...state,
        gameTournamentIds: tournamentGameIds
    })
    )
)


export interface ParticipationState extends EntityState<number> {
    numberOfParticipations: number
    participations: PlayerTournamentIds[]
}

const participationAdapter = createEntityAdapter<number>();

export const initialParticipationState: ParticipationState = participationAdapter.getInitialState({
    numberOfParticipations: 0,
    participations: []
})

export const participationReducer = createReducer(
    initialParticipationState,
    on(TournamentActions.loadNumberOfParticipationsSuccess, (state, { num }) =>
    ({
        ...state,
        numberOfParticipations: num
    })
    ),
    on(TournamentActions.loadParticipationsPaginationSuccess, (state, { participation }) =>
    ({
        ...state,
        participations: participation
    })
    )
)