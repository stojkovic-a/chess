import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Song } from "../../models/song";
import { Filter, Game, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto } from "../../models";
import { GameState } from "./game.reducer";
import { filter } from "rxjs";
import { BlockParameter } from "@angular/compiler";

export const selectGameFeature = createSelector(
    (state: AppState) => state.games,
    (games) => games
)

export const selectGameIds = createSelector(
    selectGameFeature,
    (games) => games.ids
)

export const selectGamesList = createSelector(
    selectGameFeature,
    (games) => games.ids
        .map(id => games.entities[id])
        .filter(game => game != null)
        .map((game) => <Game>game)
)

export const selectSelectedGame = createSelector(
    selectGameFeature,
    (games) => games.selectedGame
)

export const selectGameWithPositions = createSelector(
    selectGameFeature,
    (game) => game.gameWithPositions
)


export const selectGamesByPosition = createSelector(
    selectGameFeature,
    (game) => game.gamesByPositionWithMove
)

export const selectMoveNumber = createSelector(
    selectGameFeature,
    (game) => game.currentMoveNumber
)

export const selectNumberOfGamesWithPos = createSelector(
    selectGameFeature,
    (game) => game.gameWithPosNumber
)

export const selectCreatedGameId = createSelector(
    selectGameFeature,
    (game) => game.createdGameId
)