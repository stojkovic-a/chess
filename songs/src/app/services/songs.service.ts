import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Song } from '../models/song';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private httpClient:HttpClient) { 

  }

  getAll(){
    return this.httpClient.get<Song[]>(environment.api+"/songs");
  }

}
