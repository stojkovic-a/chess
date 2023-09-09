import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as ChessActions from './chess.action';
import { SongsService } from "../services/songs.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { GamesService } from "../services/games.service/games.service";
import { initialPageState, pageReducer } from "./chess.reducer";
import { AppState } from "src/app/app.state";
import { PlayerService } from "../services/player.service/player.service";

@Injectable()
export class ChessEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
    ) {
    }

    loadGames$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChessActions.loadGames),
            mergeMap(() =>
                this.gamesService.getGamesPaging().pipe(
                    map((games) => (ChessActions.loadGamesSuccess({ games: games }))),
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



}