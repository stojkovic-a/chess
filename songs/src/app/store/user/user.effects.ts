import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as UserActions from './user.action'
import * as PageActions from '../page/page.action'
import * as FilterActions from '../filter/filter.action'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { GamesService } from "../../services/games.service/games.service";
import { AppState } from "src/app/app.state";
import { PlayerService } from "../../services/player.service/player.service";
import { FilterService } from "../../services/filter.service/filter.service";
import { Filter, Tournament } from "../../models";
import { UserService } from "../../services/user.service/user.service";
import { TournamentService } from "../../services/tornament.service/tournament.service";

@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
        private filterService: FilterService,
        private userService: UserService,
        private tournamentService: TournamentService
    ) { }

    loadPlayer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadPlayer),
            mergeMap((action) =>
                this.playerService.getPlayer(action.playerId).pipe(
                    map((player) =>
                        UserActions.loadPlayerSuccess({ player })
                    ),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadNumberOfUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadNumberOfUsers),
            mergeMap(() =>
                this.userService.getNumberOfUsers().pipe(
                    map((result) => {
                        return UserActions.loadNumberOfUsersSuccess({ numberOfUsers: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadUsersPagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsersPagination),
            mergeMap((action) =>
                this.userService.getUsersPaging(action.pageSize, action.pageIndex).pipe(
                    map((result) => {
                        return UserActions.loadUsersPaginationSuccess({ users: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteSelectedUser),
            mergeMap((action) =>
                this.userService.deleteUser(action.userId).pipe(
                    map((result) => {
                        return UserActions.deleteSelectedUserSuccess({ deletedId: result })
                    }),
                    catchError((error) =>
                        of({ type: 'delete error' })
                    )
                )
            )
        )
    )

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap((action) =>
                this.userService.updateUser(action.user).pipe(
                    map((result) => {
                        return UserActions.updateUserSuccess({ userId: result })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' })
                    )
                )
            )
        )
    )
}