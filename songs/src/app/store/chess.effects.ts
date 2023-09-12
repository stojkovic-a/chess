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

@Injectable()
export class ChessEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
        private filterService: FilterService,

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



}