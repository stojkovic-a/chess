import { GameType } from "../enums";

export interface Tournament{
    id:number,
    tournamentName:string,
    startingDate:Date,
    endingDate?:Date,
    gamesType:GameType,
    minElo:number,
}