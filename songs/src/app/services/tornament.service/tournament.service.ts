import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tournament } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNumberOfTournaments() {
    return this.httpClient.get<number>(environment.api + `tournament/tournaments/numberOf`);
  }

  getTournamentsPagination(skip: number, take: number) {
    return this.httpClient.get<Tournament[]>(environment.api + `tournament/pagination/${skip}/${take}`);
  }

  createTournament(tournament: Tournament) {
    return this.httpClient.post<Tournament>(environment.api + `tournament`, tournament);
  }

  deleteTournament(id: number) {
    return this.httpClient.delete<number>(environment.api + `tournament/${id}`);
  }

  updateTorunament(id: number, tournament: Tournament) {
    return this.httpClient.put<number>(environment.api + `tournament/${id}`, tournament);
  }

  addPlayer(userId: number, tournamentId: number) {
    return this.httpClient.put(environment.api + `tournament/addPlayer/${userId}/${tournamentId}`, null);
  }
  removePlayer(userId: number, tournamentId: number) {
    return this.httpClient.put(environment.api + `tournament/removePlayer/${userId}/${tournamentId}`, null);
  }

  addGame(gameId: number, tournamentId: number) {
    return this.httpClient.put(environment.api + `tournament/addGame/${gameId}/${tournamentId}`, null);
  }
  removeGame(gameId: number, tournamentId: number) {
    return this.httpClient.put(environment.api + `tournament/removeGame/${gameId}/${tournamentId}`, null);
  }
}
