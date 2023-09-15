export interface userDto {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: Date,
    representingCountry: string,
    isPlayer: boolean,
    classicalElo: number,
    rapidElo: number,
    blitzElo: number,
    isAdmin: boolean,
}