export class SignUpDto {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    representingCountry?: string;
    classicalElo?: number;
    rapidElo?: number;
    blitzElo?: number;
    isPlayer?: boolean
}