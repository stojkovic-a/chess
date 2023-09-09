import { GameState, PageState, PlayerState } from "./chess/store/chess.reducer";

export interface AppState{
    pages:PageState;
    players:PlayerState;
    games:GameState;
    auth: AuthState
}
export const initialAppState: AppState = {
    auth: initialAuthState,
    songs: initialSongState
};
