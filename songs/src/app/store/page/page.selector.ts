import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Song } from "../../models/song";
import { Filter, Game, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto } from "../../models";
import { filter } from "rxjs";
import { BlockParameter } from "@angular/compiler";

export const selectPagesFeature = createSelector(
    (state: AppState) => state.pages,
    (pages) => pages
);

export const selectNumberOfGames = createSelector(
    selectPagesFeature,
    (pages) => pages.numberOfGames
)
export const selectPagesNumber = createSelector(
    selectPagesFeature,
    (pages) => pages.pageNumber
);
