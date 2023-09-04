import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Song } from "../models/song";


export const selectSongFeature = createSelector(
    (state: AppState) => state.songs,
    (songs) => songs
);

export const selectSongIds = createSelector(
    selectSongFeature,
    (songs) => songs.ids
);

// export const selectSongsDict=createSelector(
//     selectSongsFeature,
//     (songs)=>songs.list
// )
export const selectSongsList = createSelector(
    selectSongFeature,
    (songs) => songs.ids
    .map(id => songs.entities[id])
    .filter(song=>song!=null)
    .map((song)=><Song>song)
)
export const selectSelectedSongId = createSelector(
    selectSongFeature,
    (songs) => songs.selectedSong
);

export const selectSelectedSong = createSelector(
    selectSongFeature,
    selectSelectedSongId,
    (songs,songId)=>songs.entities[songId]
    
);
