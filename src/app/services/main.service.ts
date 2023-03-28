import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MainService {
  apiUrl: string = 'https://api.disneyapi.dev/characters';

  constructor(private http: HttpClient) {}

  getAllDisneyCharacters(
    pageIndexValue?: number,
    pageSizeValue?: number,
    sortField?: string,
    sortOrder?: string
  ) {
    let params = new HttpParams();

    params = params
      .set('page', pageIndexValue.toString())
      .set('pageSize', pageSizeValue.toString());

    if (sortField && sortOrder) {
      params = params.set('sort', `${sortField}:${sortOrder}`);
    }

    return this.http.get(`${this.apiUrl}`, { params });
  }

  searchCharacters(name?: string) {
    let params = new HttpParams();
    params = params.set('name', name);

    return this.http.get('https://api.disneyapi.dev/character', { params });
  }
}
