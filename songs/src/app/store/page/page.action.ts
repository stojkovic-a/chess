import { createAction, props } from "@ngrx/store";
import { Filter, Game, GameCreationDto, GameTournamentIds, Player, PlayerTournamentIds, Tournament, userDto } from "../../models";
import { GamePosNum } from "../../interfaces";

export const changePage = createAction(
    "Change Page",
    props<{ newPage: number }>()
)