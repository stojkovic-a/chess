import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Player, userDto } from "../../models";


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
