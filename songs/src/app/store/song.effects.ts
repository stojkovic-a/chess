import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as SongActions from './song.action';
import { SongsService } from "../services/songs.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class SongsEffects {
    constructor(private actions$: Actions, private songsService: SongsService) {

    }
    loadSongs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SongActions.loadSongs),
            mergeMap(() =>
                this.songsService.getAll().pipe(
                    map((songs) => (SongActions.loadSongsSucess({ songs: songs }))),
                    catchError(() => of({ type: 'load error' }))
                )
            )
        )
    )


    
}