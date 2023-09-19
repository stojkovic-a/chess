import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as GameActions from './game.action'
import { catchError, map, mergeMap, of } from "rxjs";
import { GamesService } from "../../services/games.service/games.service";

@Injectable()
export class GameEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
    ) { }

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadGames),
            mergeMap((action) =>
                this.gamesService.getGamesPaging(action.pageSize).pipe(
                    map((games) => (GameActions.loadGamesSuccess({ games: games }))),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    );

    loadNumberOfGame$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadNumberOfGames),
            mergeMap(() =>
                this.gamesService.getNumberOfGames().pipe(
                    map((num) => (GameActions.loadNumberOfGameSuccess({ numberOfGames: num }))),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    )

    loadGameWithPosition$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GameActions.loadGameWithPositions),
            mergeMap((action) =>
                this.gamesService.getGameWithPositions(action.id).pipe(
                    map((game) =>
                        GameActions.loadGameWithPositionsSuccess({ game })
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
            ofType(GameActions.loadGamesByPosition),
            mergeMap((action) =>
                this.gamesService.getGameByPosition(action.position, action.pageNum, action.pageSize).pipe(
                    map((games) =>
                        GameActions.loadGamesByPositionSuccess({ combination: games })
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
            ofType(GameActions.loadNumberOfGamesWithPos),
            mergeMap((action) =>
                this.gamesService.getNumberOfGamesByPosition(action.position).pipe(
                    map((number) =>
                        GameActions.loadNumberOfGamesWithPosSuccess({ numberOfGamesWithPos: number })
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
            ofType(GameActions.deleteGame),
            mergeMap((action) =>
                this.gamesService.deleteGame(action.id).pipe(
                    map((result) => {
                        return GameActions.deleteGameSuccess({ id: action.id })
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
            ofType(GameActions.createGame),
            mergeMap((action) =>
                this.gamesService.createGame(action.gameCreationDto).pipe(
                    map((result) => {
                        if (result)
                            return GameActions.createGameSuccess({ id: result })
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
}