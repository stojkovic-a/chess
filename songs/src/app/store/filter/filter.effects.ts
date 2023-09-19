import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as FilterActions from './filter.action'
import { catchError, map, mergeMap, of } from "rxjs";
import { FilterService } from "../../services/filter.service/filter.service";
import { Filter } from "../../models";

@Injectable()
export class FilterEffects {
    constructor(
        private actions$: Actions,
        private filterService: FilterService,
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