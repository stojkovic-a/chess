import { createAction, props } from "@ngrx/store";
import {  Game, GameCreationDto} from "../../models";
import { GamePosNum } from "../../interfaces";

export const loadGames = createAction(
    "Load Games",
    props<{ pageSize: number }>()
);

export const loadGamesSuccess = createAction(
    "Load Games Success",
    props<{ games: Game[] }>()
);

export const loadNumberOfGames = createAction(
    "Load Number Of Games"
)

export const loadNumberOfGameSuccess = createAction(
    "Load Number Of Games Success",
    props<{ numberOfGames: number }>()
)

export const selectGame = createAction(
    "Select Game",
    props<{ game: Game }>()
)

export const loadGameWithPositions = createAction(
    "Load Game With Positions",
    props<{ id: number }>()
)

export const loadGameWithPositionsSuccess = createAction(
    "Load Game With Positions Success",
    props<{ game: Game }>()
)

export const loadGamesByPosition = createAction(
    "Load Games By Position",
    props<{ position: string, pageNum: number, pageSize: number }>()
)

export const loadGamesByPositionSuccess = createAction(
    "Load Games By Position Success",
    props<{ combination: GamePosNum[] }>()
)

export const setCurrentGameMove = createAction(
    "Set Current Game Move",
    props<{ moveNum: number }>()
)

export const loadNumberOfGamesWithPos = createAction(
    "Load Number Of Games With Pos",
    props<{ position: string }>()
)

export const loadNumberOfGamesWithPosSuccess = createAction(
    "Load Number Of Games With Pos Success",
    props<{ numberOfGamesWithPos: number }>()
)

export const deleteGame = createAction(
    "Delete Game",
    props<{ id: number }>()
)

export const deleteGameSuccess = createAction(
    "Delete Game Success",
    props<{ id: number }>()
)

export const createGame = createAction(
    "Create Game",
    props<{ gameCreationDto: GameCreationDto }>()
)

export const createGameSuccess = createAction(
    "Create Game Success",
    props<{ id: number }>()
)

