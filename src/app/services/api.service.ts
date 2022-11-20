import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://rickandmortyapi.com/api/';
  constructor(private http: HttpClient) {}

  getData<T>(endPoint: string, params?: HttpParams) {
    return this.http.get<T>(`${this.baseUrl}${endPoint}`, {
      params,
    });
  }
}
