import { AuthState } from "./store/auth/auth.reducer";
import { FilterState, GameState, GameTournamentState, PageState, ParticipationState, PlayerState, TournamentState, UserState } from "./store/chess.reducer";

export interface AppState {
    pages: PageState;
    players: PlayerState;
    games: GameState;
    auth: AuthState;
    filters: FilterState;
    users: UserState;
    tournament: TournamentState;
    participation: ParticipationState;
    gameTournament: GameTournamentState;
}
// export const initialAppState: AppState = {
//     auth: initialAuthState,

// };
