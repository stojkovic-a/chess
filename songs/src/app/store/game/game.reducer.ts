import { createReducer, on } from "@ngrx/store";
import * as GameActions from './game.action'
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Game } from "../../models";
import { GamePosNum } from "../../interfaces";

export interface GameState extends EntityState<Game> {
    selectedGame: Game
    gameWithPositions: Game
    gamesByPositionWithMove: GamePosNum[]
    currentMoveNumber: number
    gameWithPosNumber: number
    createdGameId: number
}

const gameAdapter = createEntityAdapter<Game>();
export const initialGameState: GameState = gameAdapter.getInitialState({
    selectedGame: null,
    gameWithPositions: null,
    gamesByPositionWithMove: [],
    currentMoveNumber: -1,
    gameWithPosNumber: 0,
    createdGameId: null
});

export const gameReducer = createReducer(
    initialGameState,
    on(GameActions.loadGamesSuccess, (state, { games }) =>
        gameAdapter.setAll(games, state),

    ),
    on(GameActions.selectGame, (state, { game }) =>
    ({
        ...state,
        selectedGame: game
    })
    ),
    on(GameActions.loadGameWithPositionsSuccess, (state, { game }) =>
    ({
        ...state,
        gameWithPositions: game
    })
    ),
    on(GameActions.loadGamesByPositionSuccess, (state, combination) =>
    ({
        ...state,
        gamesByPositionWithMove: combination.combination
    })
    ),
    on(GameActions.setCurrentGameMove, (state, { moveNum }) =>
    ({
        ...state,
        currentMoveNumber: moveNum
    })
    ),
    on(GameActions.loadNumberOfGamesWithPosSuccess, (state, { numberOfGamesWithPos }) =>
    ({
        ...state,
        gameWithPosNumber: numberOfGamesWithPos
    })
    ),
    on(GameActions.deleteGameSuccess, (state, { id }) =>
        gameAdapter.removeOne(id, state)
    ),
    on(GameActions.createGameSuccess, (state, { id }) =>
    ({
        ...state,
        createdGameId: id
    })
    )
)