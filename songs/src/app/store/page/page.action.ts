import { createAction, props } from "@ngrx/store";


export const changePage = createAction(
    "Change Page",
    props<{ newPage: number }>()
)