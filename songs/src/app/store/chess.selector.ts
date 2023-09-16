import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Song } from "../models/song";
import { Filter, Game, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto } from "../models";
import { PlayerState } from "./chess.reducer";
import { filter } from "rxjs";
import { BlockParameter } from "@angular/compiler";
import { selectUser } from "./chess.action";


export const selectPlayerFeature = createSelector(
    (state: AppState) => state.players,
    (players) => players
)

export const selectPlayerInfo = createSelector(
    selectPlayerFeature,
    (players) => players.selectedPlayer
)

export const selectPlayerName = (id: number) => createSelector(
    selectPlayerFeature,
    (players) => {
        const matchingPlayer = players.ids
            .map(id => players.entities[id])
            .find(player => player?.id === id);

        return matchingPlayer ? <Player>matchingPlayer : null;
    }
    // (players) => players.ids
    //     .map(id => players.entities[id])
    //     .find(player=>player?.id===id)
    //     // .filter(player => player?.id == id)
    //     // .map(player => <Player>player)
)

export const selectPagesFeature = createSelector(
    (state: AppState) => state.pages,
    (pages) => pages
);

export const selectNumberOfGames = createSelector(
    selectPagesFeature,
    (pages) => pages.numberOfGames
)
export const selectPagesNumber = createSelector(
    selectPagesFeature,
    (pages) => pages.pageNumber
);

export const selectGameFeature = createSelector(
    (state: AppState) => state.games,
    (games) => games
)

export const selectGameIds = createSelector(
    selectGameFeature,
    (games) => games.ids
)

export const selectGamesList = createSelector(
    selectGameFeature,
    (games) => games.ids
        .map(id => games.entities[id])
        .filter(game => game != null)
        .map((game) => <Game>game)
)

export const selectSelectedGame = createSelector(
    selectGameFeature,
    (games) => games.selectedGame
)

export const selectGameWithPositions = createSelector(
    selectGameFeature,
    (game) => game.gameWithPositions
)
export const selectFilterFeature = createSelector(
    (state: AppState) => state.filters,
    (filters) => filters
)

export const selectPlayerFilters = createSelector(
    selectFilterFeature,
    (filters) => filters.players
)

export const selectTournamentFilters = createSelector(
    selectFilterFeature,
    (filters) => filters.tournaments
)

export const selectWhitePlayerFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedWhitePlayerFilter
)

export const selectBlackPlayerFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedBlackPlayerFilter
)

export const selectStartDateFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedStartDateFilter
)

export const selectEndDateFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedEndDateFilter
)

export const selectTournamentFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedTournamentFilter
)

export const selectResultFilter = createSelector(
    selectFilterFeature,
    (filters) => filters.selectedResultFilter
)

export const selectAllFilters = createSelector(
    selectFilterFeature,
    (filter) => {
        filter.selectedWhitePlayerFilter,
            filter.selectedBlackPlayerFilter,
            filter.selectedResultFilter,
            filter.selectedStartDateFilter,
            filter.selectedEndDateFilter,
            filter.selectedTournamentFilter
    }
)

export const selectGamesByPosition = createSelector(
    selectGameFeature,
    (game) => game.gamesByPositionWithMove
)

export const selectMoveNumber = createSelector(
    selectGameFeature,
    (game) => game.currentMoveNumber
)

export const selectNumberOfGamesWithPos = createSelector(
    selectGameFeature,
    (game) => game.gameWithPosNumber
)

export const selectCreatedGameId = createSelector(
    selectGameFeature,
    (game) => game.createdGameId
)

export const selectUserFeature = createSelector(
    (state: AppState) => state.users,
    (users) => users
)

export const selectUsersPagination = createSelector(
    selectUserFeature,
    (users) => users.ids
        .map(id =>
            users.entities[id]
        )
        .filter(user =>
            user != null
        )
        .map(user =>
            <userDto>user
        )
)

export const selectNumberOfUsers = createSelector(
    selectUserFeature,
    (users) => users.numberOfUsers
)

export const selectDeletedUser = createSelector(
    selectUserFeature,
    (users) => users.deletedUserId
)

export const selectSelectedUserdId = createSelector(
    selectUserFeature,
    (users) => users.selectedUserId
)

export const selectSelectedUser = createSelector(
    selectUserFeature,
    (users) => {
        const selectedUserId = users.selectedUserId;
        if (selectedUserId === null) {
            return null;
        }
        const selectedUserEntity = users.entities[selectedUserId];
        if (!selectedUserEntity) {
            return null;
        }
        return selectedUserEntity as userDto;
    }

)

export const selectUserUpdateId = createSelector(
    selectUserFeature,
    (users) => users.updatedUserId
)



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