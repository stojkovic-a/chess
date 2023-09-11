import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../../models';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private httpClient: HttpClient) { }

  getPlayer(id: number): Observable<Player> {
    return this.httpClient.get<Player>(environment.api + `user/${id}`);
  }
}
