import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData<T>(endPoint: string, params?: HttpParams) {
    return this.http.get<T>(`${environment.baseUrl}${endPoint}`, {
      params,
    });
  }
}
