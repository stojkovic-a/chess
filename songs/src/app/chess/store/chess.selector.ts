import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Song } from "../models/song";
import { Game, Player } from "../models";
import { PlayerState } from "./chess.reducer";


export const selectPlayerFeature = createSelector(
    (state: AppState) => state.players,
    (players) => players
)


export const selectPlayerName = (id: number) => createSelector(
    selectPlayerFeature,
    (players) => {
        const matchingPlayer = players.ids
            .map(id => players.entities[id])
            .find(player => player?.id === id);
        
        return matchingPlayer ? <Player>matchingPlayer : null;
    }
    // (players) => players.ids
    //     .map(id => players.entities[id])
    //     .find(player=>player?.id===id)
    //     // .filter(player => player?.id == id)
    //     // .map(player => <Player>player)
)

export const selectPagesFeature = createSelector(
    (state: AppState) => state.pages,
    (pages) => pages
);


export const selectPagesNumber = createSelector(
    selectPagesFeature,
    (pages) => pages.pageNumber
);

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

