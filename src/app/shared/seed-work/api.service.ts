import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from './result-response.model';
import environment from '../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment().apiUrl;

  constructor(private http: HttpClient) {}

  private request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    options: {
      body?: any;
      params?: HttpParams;
      headers?: HttpHeaders;
    } = {}
  ): Observable<ResultResponse<T>> {
    return this.http.request<ResultResponse<T>>(
      method,
      `${this.baseUrl}/${endpoint}`,
      {
        body: options.body,
        params: options.params,
        headers: options.headers,
      }
    );
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<ResultResponse<T>> {
    return this.request('GET', endpoint, { params });
  }

  post<T>(
    endpoint: string,
    body: any,
    headers?: HttpHeaders
  ): Observable<ResultResponse<T>> {
    return this.request('POST', endpoint, { body, headers });
  }
}
