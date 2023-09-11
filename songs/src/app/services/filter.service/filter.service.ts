import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Filter } from 'src/app/models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getFilters() {
    return this.httpClient.get<{ names: string[], tournaments: string[] }>(environment.api + 'misc');
  }



}
