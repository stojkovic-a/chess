import { AuthState } from "./store/auth/auth.reducer";
import { FilterState } from "./store/filter/filter.reducer";
import { GameState } from "./store/game/game.reducer";
import { PageState } from "./store/page/page.reducer";
import { GameTournamentState, ParticipationState, TournamentState } from "./store/tournament/tournament.reducer";
import { PlayerState, UserState } from "./store/user/user.reducer";

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
