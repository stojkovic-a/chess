export class GameCreationDto {
    whitePlayerId: number;
    blackPlayerId: number;
    gameDate: Date;
    winnerId: number;
    startingTime: number;
    increment: number;
    gamePGN: string[];
    tournamentId: number;

    constructor() {
        this.gamePGN = [];
    }

    addPgn(pgn: string) {
        this.gamePGN = [];
        this.gamePGN.push(pgn);
    }
}