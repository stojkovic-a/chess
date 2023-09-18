import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType, act } from "@ngrx/effects";
import * as UserActions from '../user/user.action'
import * as TournamentActions from './tournament.action'
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
export class TournamentEffects {
    constructor(
        private actions$: Actions,
        private gamesService: GamesService,
        private playerService: PlayerService,
        private filterService: FilterService,
        private userService: UserService,
        private tournamentService: TournamentService
    ) { }



    loadNumberOfTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadNumberOfTournaments),
            mergeMap((action) =>
                this.tournamentService.getNumberOfTournaments().pipe(
                    map((result) => {
                        return TournamentActions.loadNumberOfTournamentsSuccess({ numberOfTournaments: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadTournamentsPagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadTournamentsPagination),
            mergeMap((action) =>
                this.tournamentService.getTournamentsPagination(action.skip, action.take).pipe(
                    map((result) => {
                        return TournamentActions.loadTournamentsPaginationSuccess({ tournamets: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' }))
                )
            )
        )
    )

    createTorunament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.CreateTournament),
            mergeMap((action) =>
                this.tournamentService.createTournament(action.tournament).pipe(
                    map((result) => {
                        return TournamentActions.CreateTournamentSuccess({ id: result.id })
                    }),
                    catchError((error) =>
                        of({ type: 'create error' })
                    )
                )
            )
        )
    )

    deleteTorunament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.deleteSelectedTournament),
            mergeMap((action) =>
                this.tournamentService.deleteTournament(action.tournamentId).pipe(
                    map((result) => {
                        return TournamentActions.deleteSelectedTournamentSuccess({ deletedId: result })
                    }),
                    catchError((error) =>
                        of({ type: 'delete error' })
                    )
                )
            )
        )
    )

    updateTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.updateTournament),
            mergeMap((action) =>
                this.tournamentService.updateTorunament(action.tournament.id, action.tournament).pipe(
                    map((result) => {
                        return TournamentActions.updateTournamentSuccess({ tournamentId: result })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' })
                    )
                )
            )
        )
    )


    addGameToTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.addGameToTournament),
            mergeMap((actions) =>
                this.tournamentService.addGame(actions.gameId, actions.tournamentId).pipe(
                    map((result) => {
                        return TournamentActions.addGameToTournamentSuccess({ tournamentId: actions.tournamentId, gameId: actions.gameId })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' })
                    )
                )
            )
        )
    )

    removeGameFromTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.removeGameFromTournament),
            mergeMap((actions) =>
                this.tournamentService.removeGame(actions.gameId, actions.tournamentId).pipe(
                    map((reuslt) => {
                        return TournamentActions.removeGameFromTournamentSuccess({ tournamentId: actions.tournamentId, gameId: actions.gameId })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' })
                    )
                )
            )
        )
    )

    addPlayerToTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.addPlayerToTournament),
            mergeMap((actions) =>
                this.tournamentService.addPlayer(actions.playerId, actions.tournamentId).pipe(
                    map((result) => {
                        return TournamentActions.addPlayerToTournamentSuccess({ tournamentId: actions.tournamentId, playerId: actions.playerId })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' })
                    )
                )
            )
        )
    )

    removePlayerFromTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.removePlayerFromTournament),
            mergeMap((actions) =>
                this.tournamentService.removePlayer(actions.playerId, actions.tournamentId).pipe(
                    map((result) => {
                        return TournamentActions.removePlayerFromTournamentSuccess({ tournamentId: actions.tournamentId, playerId: actions.playerId })
                    }),
                    catchError((error) =>
                        of({ type: 'update error' }))
                )
            )
        )
    )

    loadNumberOfParticipation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadNumberOfParticipations),
            mergeMap((actions) =>
                this.userService.getNumberOfParticipations().pipe(
                    map((result) => {
                        return TournamentActions.loadNumberOfParticipationsSuccess({ num: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadNumberOfGameTurnament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadNumberOfGameTournaments),
            mergeMap((actions) =>
                this.gamesService.getNumberOfTournamentGames().pipe(
                    map((result) => {
                        return TournamentActions.loadNumberOfGameTournamentsSuccess({ num: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' })
                    )
                )
            )
        )
    )

    loadParticipationsPagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadParticipationsPagination),
            mergeMap((actions) =>
                this.userService.getParticipationsPagination(actions.skip, actions.take).pipe(
                    map((result) => {
                        return TournamentActions.loadParticipationsPaginationSuccess({ participation: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' }))
                )
            )
        )
    )

    loadGameTournamentPagination$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TournamentActions.loadTournamentGamePagination),
            mergeMap((actions) =>
                this.gamesService.getTournamentGamesIdsPagination(actions.skip, actions.take).pipe(
                    map((result) => {
                        return TournamentActions.loadTournamentGamePaginationSuccess({ tournamentGameIds: result })
                    }),
                    catchError((error) =>
                        of({ type: 'load error' }))
                )
            )
        )
    )
}
