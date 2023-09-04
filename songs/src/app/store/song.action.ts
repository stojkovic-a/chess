import { createAction, props } from "@ngrx/store";
import { Song, SongRating } from "../models/song";

export const loadSongs=createAction("Load Songs");
export const loadSongsSucess=createAction(
    'Load Songs Success',
    props<{songs:Song[]}>()
    );
export const selectSong=createAction(
    'Select a song',
    props<{songId:number}>()
    );
export const rateSong=createAction(
    'Rate a song',
    props<{songId:number,rating:SongRating}>()
)