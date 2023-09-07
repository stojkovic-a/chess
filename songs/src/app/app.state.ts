import { AuthState, initialState as initialAuthState } from "./store/auth/auth.reducer";
import { SongsState, initialState as initialSongState } from "./store/song.reducer";

export interface AppState {
    songs: SongsState;
    auth: AuthState
}

export const initialAppState: AppState = {
    auth: initialAuthState,
    songs: initialSongState
};