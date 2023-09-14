import { AuthState } from "./store/auth/auth.reducer";
import { FilterState, GameState, PageState, PlayerState, UserState } from "./store/chess.reducer";

export interface AppState {
    pages: PageState;
    players: PlayerState;
    games: GameState;
    auth: AuthState;
    filters: FilterState;
    users: UserState;
}
// export const initialAppState: AppState = {
//     auth: initialAuthState,

// };
