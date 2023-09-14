import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as ChessActions from './chess.action';
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { GamesService } from "../services/games.service/games.service";
import { initialPageState, pageReducer } from "./chess.reducer";
import { AppState } from "src/app/app.state";
import { PlayerService } from "../services/player.service/player.service";
import { FilterService } from "../services/filter.service/filter.service";
import { Filter } from "../models";
import { UserService } from "../services/user.service/user.service";

@Injectable()
export class ChessEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
        private filterService: FilterService,
        private userService: UserService,
    ) { }

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadGames),
            mergeMap((action) =>
                this.gamesService.getGamesPaging(action.pageSize).pipe(
                    map((games) => (ChessActions.loadGamesSuccess({ games: games }))),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    loadNumberOfGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadNumberOfGames),
            mergeMap(() =>
                this.gamesService.getNumberOfGames().pipe(
                    map((num) => (ChessActions.loadNumberOfGameSuccess({ numberOfGames: num }))),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    )

    loadPlayer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadPlayer),
            mergeMap((action) =>
                this.playerService.getPlayer(action.playerId).pipe(
                    map((player) =>
                        ChessActions.loadPlayerSuccess({ player })
                    ),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadFilter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadFilters),
            mergeMap(() =>
                this.filterService.getFilters().pipe(
                    map((filter) => {
                        console.log('log fron effect', filter);
                        const filters: Filter = {
                            playerNames: filter.names,
                            tournamentNames: filter.tournaments
                        }
                        return ChessActions.loadFiltersSuccess({ filters })
                    }
                    ),
                    catchError((error) =>
                        of({ type: 'load error' }))
                )
            )
        )
    )

    loadGameWithPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadGameWithPositions),
            mergeMap((action) =>
                this.gamesService.getGameWithPositions(action.id).pipe(
                    map((game) =>
                        ChessActions.loadGameWithPositionsSuccess({ game })
                    ),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadGamesByPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadGamesByPosition),
            mergeMap((action) =>
                this.gamesService.getGameByPosition(action.position, action.pageNum, action.pageSize).pipe(
                    map((games) =>
                        ChessActions.loadGamesByPositionSuccess({ combination: games })
                    ),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadNumberOfGamesByPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadNumberOfGamesWithPos),
            mergeMap((action) =>
                this.gamesService.getNumberOfGamesByPosition(action.position).pipe(
                    map((number) =>
                        ChessActions.loadNumberOfGamesWithPosSuccess({ numberOfGamesWithPos: number })
                    ),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    deleteGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.deleteGame),
            mergeMap((action) =>
                this.gamesService.deleteGame(action.id).pipe(
                    map((result) => {
                        console.log(result);
                        return ChessActions.deleteGameSuccess({ id: action.id })
                    }
                    ),
                    catchError((error) =>
                        of({ type: 'delete error' })
                    )
                )
            )
        )
    )

    createGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.createGame),
            mergeMap((action) =>
                this.gamesService.createGame(action.gameCreationDto).pipe(
                    map((result) => {
                        if (result)
                            return ChessActions.createGameSuccess({ id: result })
                        throw new Error("create erro");
                    }
                    ),
                    catchError((error) =>
                        of({ type: 'create error' })
                    )
                )
            )
        )
    )

    loadNumberOfUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadNumberOfUsers),
            mergeMap(() =>
                this.userService.getNumberOfUsers().pipe(
                    map((result) => {
                        return ChessActions.loadNumberOfUsersSuccess({ numberOfUsers: result })
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
            ofType(ChessActions.loadUsersPagination),
            mergeMap((action) =>
                this.userService.getUsersPaging(action.pageSize, action.pageIndex).pipe(
                    map((result) => {
                        return ChessActions.loadUsersPaginationSuccess({ users: result })
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
            ofType(ChessActions.deleteSelectedUser),
            mergeMap((action) =>
                this.userService.deleteUser(action.userId).pipe(
                    map((result) => {
                        return ChessActions.deleteSelectedUserSuccess({ deletedId: result })
                    }),
                    catchError((error) =>
                        of({ type: 'delete erro' })
                    )
                )
            )
        )
    )
}