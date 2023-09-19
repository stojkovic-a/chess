import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as UserActions from '../user/user.action'
import * as PageActions from '../page/page.action'
import * as FilterActions from './filter.action'
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { GamesService } from "../../services/games.service/games.service";
import { AppState } from "src/app/app.state";
import { PlayerService } from "../../services/player.service/player.service";
import { FilterService } from "../../services/filter.service/filter.service";
import { Filter, Tournament } from "../../models";
import { UserService } from "../../services/user.service/user.service";
import { TournamentService } from "../../services/tornament.service/tournament.service";

@Injectable()
export class FilterEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
        private filterService: FilterService,
        private userService: UserService,
        private tournamentService: TournamentService
    ) { }


    loadFilter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FilterActions.loadFilters),
            mergeMap(() =>
                this.filterService.getFilters().pipe(
                    map((filter) => {
                        const filters: Filter = {
                            playerNames: filter.names,
                            tournamentNames: filter.tournaments
                        }
                        return FilterActions.loadFiltersSuccess({ filters })
                    }
                    ),
                    catchError((error) =>
                        of({ type: 'load error' }))
                )
            )
        )
    )
}