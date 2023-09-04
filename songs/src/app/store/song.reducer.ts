import { createReducer, on } from "@ngrx/store";
import { Song } from "../models/song"
import * as Actions from './song.action';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { state } from "@angular/animations";



export interface SongsState extends EntityState<Song> {
    selectedSong: number;
}


const adapter = createEntityAdapter<Song>();

export const initialState: SongsState = adapter.getInitialState({
    selectedSong: 0
});

export const songReducer = createReducer(
    initialState,
    on(Actions.selectSong, (state, { songId }) => {
        return {
            ...state,
            selectedSong: songId
        }
    }),
    on(Actions.loadSongsSucess, (state, { songs }) =>
        adapter.setAll(songs, state
        )),
    on(Actions.rateSong, (state, { songId, rating }) =>
        adapter.updateOne({
            id: songId,
            changes: {
                rating
            },
        },
            state
        )
    )
);