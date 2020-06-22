import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {
  apiUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  get(
    endpoint: string[],
    headers: {
      key: string;
      value: string;
    }[] = []
  ): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}${endpoint.join('/')}`, {
      ...this.setHeaders(headers)
    });
  }

  post(
    endpoint: string[],
    body: any,
    headers: {
      key: string;
      value: string;
    }[] = []
  ): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}${endpoint.join('/')}`, body, {
      ...this.setHeaders(headers)
    });
  }

  put(
    endpoint: string[],
    body: any,
    headers: {
      key: string;
      value: string;
    }[] = []
  ): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}${endpoint.join('/')}`, body, {
      ...this.setHeaders(headers)
    });
  }

  delete(
    endpoint: string[],
    headers: {
      key: string;
      value: string;
    }[] = []
  ): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}${endpoint.join('/')}`, {
      ...this.setHeaders(headers)
    });
  }

  private setHeaders(
    headers: {
      key: string;
      value: string;
    }[]
  ): HttpHeaders {
    const _headers = new HttpHeaders();
    headers.forEach(el => {
      _headers.set(el.key, el.value);
    });
    return _headers;
  }
}
