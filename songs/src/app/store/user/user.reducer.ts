import { createReducer, on } from "@ngrx/store";
import * as UserActions from './user.action'
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Player, userDto } from "../../models";

export interface UserState extends EntityState<userDto> {
    numberOfUsers: number
    selectedUserId: number
    deletedUserId: number
    updatedUserId: number
}

const userAdapter = createEntityAdapter<userDto>();
export const initialUserState: UserState = userAdapter.getInitialState({
    numberOfUsers: 0,
    selectedUserId: 0,
    deletedUserId: 0,
    updatedUserId: 0,
});


export const userReducer = createReducer(
    initialUserState,
    on(UserActions.loadNumberOfUsersSuccess, (state, { numberOfUsers }) =>
    ({
        ...state,
        numberOfUsers: numberOfUsers
    })
    ),
    on(UserActions.loadUsersPaginationSuccess, (state, { users }) =>
        userAdapter.setAll(users, state)
    ),
    on(UserActions.selectUser, (state, { userId }) =>
    ({
        ...state,
        selectedUserId: userId
    })
    ),
    on(UserActions.deleteSelectedUserSuccess, (state, { deletedId }) => {
        const updatedState = { ...state, deletedUserId: deletedId };
        return userAdapter.removeOne(deletedId, updatedState);
    }),
    on(UserActions.updateUserSuccess, (state, { userId }) =>
    ({
        ...state,
        updatedUserId: userId
    })
    )
)

export interface PlayerState extends EntityState<Player> {
    selectedPlayer: Player | null
}

const playerAdapter = createEntityAdapter<Player>();

export const initialPlayerState: PlayerState = playerAdapter.getInitialState({
    selectedPlayer: null
})


export const playerReducer = createReducer(
    initialPlayerState,
    on(UserActions.loadPlayerSuccess, (state, { player }) =>
        playerAdapter.setOne(player, state)
    ),
    on(UserActions.selectPlayer, (state, { player }) => {
        return {
            ...state,
            selectedPlayer: player
        }
    })
)