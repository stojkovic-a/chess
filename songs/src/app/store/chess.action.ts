import { createAction, props } from "@ngrx/store";
import { Filter, Game, Player, Tournament } from "../models";

export const loadGames = createAction(
    "Load Games",
    props<{ pageSize: number }>()
);

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
    props<{ player: Player }>()
);

export const loadNumberOfGames = createAction(
    "Load Number Of Games"
)

export const loadNumberOfGameSuccess = createAction(
    "Load Number Of Games Success",
    props<{ numberOfGames: number }>()
)

export const changePage = createAction(
    "Change Page",
    props<{ newPage: number }>()
)

export const loadFilters = createAction(
    "Load Filters",
)

export const loadFiltersSuccess = createAction(
    "Load Filters Success",
    props<{ filters: Filter }>()
)

export const selectWhitePlayerFilter = createAction(
    "Select White Player Filter",
    props<{ fullName: string }>()
)
export const selectBlackPlayerFilter = createAction(
    "Select Black Player Filter",
    props<{ fullName: string }>()
)

export const selectResultFilter = createAction(
    "Select Result Filter",
    props<{ result: string }>()
)

export const selectStartDateFilter = createAction(
    "Select Start Date Filter",
    props<{ startDate: Date }>()
)
export const selectEndDateFilter = createAction(
    "Select End Date Filter",
    props<{ endDate: Date }>()
)
export const selectTournamentFilter = createAction(
    "Select Tournament Filter",
    props<{ tournament: string }>()
)

export const selectGame = createAction(
    "Select Game",
    props<{ game: Game }>()
)

export const loadGameWithPositions = createAction(
    "Load Game With Positions",
    props<{ id: number }>()
)

export const loadGameWithPositionsSuccess = createAction(
    "Load Game With Positions Success",
    props<{ game: Game }>()
)


export const loadGamesByPosition = createAction(
    "Load Games By Position",
    props<{ position: string }>()
)

export const loadGamesByPositionSuccess = createAction(
    "Load Games By Position Success",
    props<{ games: Game[],moveNums:number[] }>()
)

export const setCurrentGameMove = createAction(
    "Set Current Game Move",
    props<{ moveNum: number }>()
)