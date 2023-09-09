import { createAction, props } from "@ngrx/store";
import { Song, SongRating } from "../models/song";
import { Game, Player } from "../models";
import { Tournament } from "../models";

export const loadGames = createAction("Load Songs");
export const loadPlayer = createAction(
    "Load Players",
    props<{ playerId: number }>()
);
export const loadTournaments = createAction("Load Tournaments");

export const loadGamesSuccess = createAction(
    "Load Games Success",
    props<{ games: Game[] }>()
);

export const loadPlayerSuccess = createAction(
    "Load Players Success",
    props<{ player: Player }>()
);

export const loadTournamentsSuccess = createAction(
    "Load Tournaments Success",
    props<{ tournaments: Tournament[] }>()
);

export const selectPlayer = createAction(
    "Select a player",
    props<{ playerId: number }>()
);