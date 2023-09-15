import { createAction, props } from "@ngrx/store";
import { Filter, Game, GameCreationDto, Player, Tournament, userDto } from "../models";
import { GamePosNum } from "../interfaces";

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
    props<{ position: string, pageNum: number, pageSize: number }>()
)

export const loadGamesByPositionSuccess = createAction(
    "Load Games By Position Success",
    props<{ combination: GamePosNum[] }>()
)

export const setCurrentGameMove = createAction(
    "Set Current Game Move",
    props<{ moveNum: number }>()
)

export const loadNumberOfGamesWithPos = createAction(
    "Load Number Of Games With Pos",
    props<{ position: string }>()
)

export const loadNumberOfGamesWithPosSuccess = createAction(
    "Load Number Of Games With Pos Success",
    props<{ numberOfGamesWithPos: number }>()
)

export const deleteGame = createAction(
    "Delete Game",
    props<{ id: number }>()
)

export const deleteGameSuccess = createAction(
    "Delete Game Success",
    props<{ id: number }>()
)

export const createGame = createAction(
    "Create Game",
    props<{ gameCreationDto: GameCreationDto }>()
)

export const createGameSuccess = createAction(
    "Create Game Success",
    props<{ id: number }>()
)

export const loadNumberOfUsers = createAction(
    "Load Number Of Users",
)

export const loadNumberOfUsersSuccess = createAction(
    "Load Number Of Users Success",
    props<{ numberOfUsers: number }>()
)

export const loadUsersPagination = createAction(
    "Load Users Pagination",
    props<{ pageSize: number, pageIndex: number }>()
)

export const loadUsersPaginationSuccess = createAction(
    "Load Users Pagination Success",
    props<{ users: userDto[] }>()
)

export const selectUser = createAction(
    "Select User To Delete",
    props<{ userId: number }>()
)

export const deleteSelectedUser = createAction(
    "Delete Selected User",
    props<{ userId: number }>()
)

export const deleteSelectedUserSuccess = createAction(
    "Delete Selected User Success",
    props<{ deletedId: number }>()
)

export const updateUser = createAction(
    "Update User",
    props<{ user: userDto }>()
)

export const updateUserSuccess = createAction(
    "Update User Success",
    props<{ userId: number }>()
)

export const loadNumberOfTournaments = createAction(
    "Load Number Of Tournaments",
)

export const loadNumberOfTournamentsSuccess = createAction(
    "Load Number Of Tournaments Success",
    props<{ numberOfTournaments: number }>()
)

export const loadTournamentsPagination = createAction(
    "Load Tournaments Pagination",
    props<{ skip: number, take: number }>()
)

export const loadTournamentsPaginationSuccess = createAction(
    "Load Tournaments Pagination Success",
    props<{ tournamets: Tournament[] }>()
)

export const selectTournament = createAction(
    "Select Tournament To Delete",
    props<{ tournamentId: number }>()
)

export const CreateTournament = createAction(
    "Create Tournament",
    props<{ tournament: Tournament }>()
)

export const CreateTournamentSuccess = createAction(
    "Create Tournament Success",
    props<{ id: number }>()
)

export const deleteSelectedTournament = createAction(
    "Delete Selected Tournament",
    props<{ tournamentId: number }>()
)

export const deleteSelectedTournamentSuccess = createAction(
    "Delete Selected Tournament Success",
    props<{ deletedId: number }>()
)

export const updateTournament = createAction(
    "Update Tournament",
    props<{ tournament: Tournament }>()
)

export const updateTournamentSuccess = createAction(
    "Update Tournament Success",
    props<{ tournamentId: number }>()
)

export const addPlayerToTournament = createAction(
    "Add Player To Tournament",
    props<{ tournamentId: number, playerId: number }>()
)

export const addPlayerToTournamentSuccess = createAction(
    "Add Player To Tournament Success",
    props<{ tournamentId: number, playerId: number }>()
)

export const addGameToTournament = createAction(
    "Add Game To Tournament",
    props<{ tournamentId: number, gameId: number }>()
)

export const addGameToTournamentSuccess = createAction(
    "Add Game To Tournament Success",
    props<{ tournamentId: number, gameId: number }>()
)

export const removePlayerFromTournament = createAction(
    "Remove Player To Tournament",
    props<{ tournamentId: number, playerId: number }>()
)

export const removePlayerFromTournamentSuccess = createAction(
    "Remove Player To Tournament Success",
    props<{ tournamentId: number, playerId: number }>()
)

export const removeGameFromTournament = createAction(
    "Remove Game To Tournament",
    props<{ tournamentId: number, gameId: number }>()
)

export const removeGameFromTournamentSuccess = createAction(
    "Remove Game To Tournament Success",
    props<{ tournamentId: number, gameId: number }>()
)