import { createReducer, on } from "@ngrx/store";
import * as PageActions from './page.action'
import * as GameActions from '../game/game.action'
import { EntityState, createEntityAdapter } from "@ngrx/entity";


export interface PageState extends EntityState<number> {
    pageNumber: number;
    numberOfGames: number
}

const pageAdapter = createEntityAdapter<number>();



export const initialPageState: PageState = pageAdapter.getInitialState({
    pageNumber: 1,
    numberOfGames: 0,
});




export const pageReducer = createReducer(
    initialPageState,
    on(GameActions.loadNumberOfGameSuccess, (state, { numberOfGames }) =>
    ({
        ...state,
        numberOfGames: numberOfGames,
    })
    ),
    on(PageActions.changePage, (state, { newPage }) =>
    ({
        ...state,
        pageNumber: newPage
    })
    )
);
