import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";


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
