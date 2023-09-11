import { Player, PositionToGame, Tournament } from "./index";

export interface Game {
    id: number,
    whitePlayer: Player,
    blackPlayer: Player,
    gameDate: Date,
    winnerId: number,
    startingTime: number,
    increment: number,
    gamePgn:string[],
    tournament: Tournament,
    positionToGame: PositionToGame[]
}