import { createAction, props } from "@ngrx/store";
import { Filter, Game, GameCreationDto, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto } from "../../models";
import { GamePosNum } from "../../interfaces";

export const loadPlayer = createAction(
    "Load Players",
    props<{ playerId: number }>()
);

export const loadPlayerSuccess = createAction(
    "Load Players Success",
    props<{ player: Player }>()
);

export const selectPlayer = createAction(
    "Select a player",
    props<{ player: Player }>()
);

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
