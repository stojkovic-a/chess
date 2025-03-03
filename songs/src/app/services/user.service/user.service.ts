import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerTournamentIds, userDto } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }


  getNumberOfUsers() {
    return this.httpClient.get<number>(environment.api + `user/numberUsers`);
  }

  getUsersPaging(pageSize: number, pageIndex: number) {
    return this.httpClient.get<userDto[]>(environment.api + `user/users/${pageIndex * pageSize}/${pageSize}`);
  }

  deleteUser(id: number) {
    return this.httpClient.delete<number>(environment.api + `user/${id}`);
  }

  updateUser(user: userDto) {
    return this.httpClient.put<number>(environment.api + `user/${user.id}`, user);
  }

  getNumberOfParticipations() {
    return this.httpClient.get<number>(environment.api + `user/participation/count`);
  }

  getParticipationsPagination(skip: number, take: number) {
    return this.httpClient.get<PlayerTournamentIds[]>(environment.api + `user/participation/users/tournaments/${skip}/${take}`);
  }

}
