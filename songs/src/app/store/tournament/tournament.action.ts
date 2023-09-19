import { createAction, props } from "@ngrx/store";
import { GameTournamentIds, PlayerTournamentIds, Tournament } from "../../models";

export const loadTournaments = createAction("Load Tournaments");

export const loadTournamentsSuccess = createAction(
    "Load Tournaments Success",
    props<{ tournaments: Tournament[] }>()
);

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

export const loadNumberOfParticipations = createAction(
    "Load Number Of Participations",
)

export const loadNumberOfParticipationsSuccess = createAction(
    "Load Number Of Participations Success",
    props<{ num: number }>()
)


export const loadNumberOfGameTournaments = createAction(
    "Load Number Of Game Tournaments",
)

export const loadNumberOfGameTournamentsSuccess = createAction(
    "Load Number Of Game Tournaments Success",
    props<{ num: number }>()
)

export const loadParticipationsPagination = createAction(
    "Load Participations Pagination",
    props<{ skip: number, take: number }>()
)

export const loadParticipationsPaginationSuccess = createAction(
    "Load Participations Pagination Success",
    props<{ participation: PlayerTournamentIds[] }>()
)

export const loadTournamentGamePagination = createAction(
    "Load Tournament Game Pagination",
    props<{ skip: number, take: number }>()
)

export const loadTournamentGamePaginationSuccess = createAction(
    "Load Tournament Game Pagination Success",
    props<{ tournamentGameIds: GameTournamentIds[] }>()
)
