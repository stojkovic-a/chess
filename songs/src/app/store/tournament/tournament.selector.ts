import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Tournament } from "../../models";


export const selectTournamentFeature = createSelector(
    (state: AppState) => state.tournament,
    (tournaments) => tournaments
)



export const selectTournamentPagination = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.ids
        .map(id =>
            tournaments.entities[id]
        )
        .filter(tournament =>
            tournament != null
        )
        .map(tournament =>
            <Tournament>tournament
        )
)

export const selectNumberOfTournaments = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.numberOfTournaments
)

export const selectCreatedTournamentId = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.createdTournamentId
)

export const selectDeletedTournament = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.deletedTournamentId
)

export const selectSelectedTournamentId = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.selectedTournamentId
)

export const selectSelectedTournament = createSelector(
    selectTournamentFeature,
    (tournaments) => {
        const selectedTournamentId = tournaments.selectedTournamentId;
        if (selectedTournamentId === null) {
            return null;
        }
        const selectedTournamentEntity = tournaments.entities[selectedTournamentId];
        if (!selectedTournamentEntity) {
            return null;
        }
        return selectedTournamentEntity as Tournament;
    }

)

export const selectTournamentUpdateId = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.selectedTournamentId
)

export const selectAddedPlayer = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.addedPlayerTournament
)

export const selectRemovedPlayer = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.removedPlayerTournament
)

export const selectAddedGame = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.addedGameTournament
)

export const selectRemovedGame = createSelector(
    selectTournamentFeature,
    (tournaments) => tournaments.removedGameTournament
)


export const selectGamesTournamentFeature = createSelector(
    (state: AppState) => state.gameTournament,
    (gameTournament) => gameTournament
)

export const selectNumberOfGameTournaments = createSelector(
    selectGamesTournamentFeature,
    (gameTournament) => gameTournament.numberOfGameTournaments
)

export const selectGamesTournaments = createSelector(
    selectGamesTournamentFeature,
    (gameTournament) => gameTournament.gameTournamentIds
)


export const selectParticipationFeature = createSelector(
    (state: AppState) => state.participation,
    (paricipation) => paricipation
)

export const selectNumberOfParticipation = createSelector(
    selectParticipationFeature,
    (participation) => participation.numberOfParticipations
)

export const selectParticipations = createSelector(
    selectParticipationFeature,
    (participation) => participation.participations
)