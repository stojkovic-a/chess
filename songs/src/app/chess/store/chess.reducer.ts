import { createAction, createReducer, on } from "@ngrx/store";
import { Song } from "../models/song"
import * as Actions from './chess.action';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";
import { Player } from "../models";
import { Game } from "../models";


export interface PageState extends EntityState<number> {
    pageNumber: number;
}

export interface PlayerState extends EntityState<Player> {
    selectedPlayer: number
}

export interface GameState extends EntityState<Game> {
    selectedGame: number
}

const pageAdapter = createEntityAdapter<number>();



export const initialPageState: PageState = pageAdapter.getInitialState({
    pageNumber: 0
});

const playerAdapter = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = playerAdapter.getInitialState({
    selectedPlayer: 0
})

const gameAdapter = createEntityAdapter<Game>();
export const initialGameState: GameState = gameAdapter.getInitialState({
    selectedGame: 0
});

export const pageReducer = createReducer(
    initialPageState,


);

export const playerReducer = createReducer(
    initialPlayerState,
    on(Actions.loadPlayerSuccess, (state, { player }) =>
        playerAdapter.setOne(player, state)
    ),
)

export const gameReducer = createReducer(
    initialGameState,
    on(Actions.loadGamesSuccess, (state, { games }) =>
        gameAdapter.setAll(games, state)
    ),
)
