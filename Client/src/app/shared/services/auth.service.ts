import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { HttpWrapperService } from '../../@core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpWrapperService: HttpWrapperService) {}

  login(body: { login: string; password: string }): Observable<any> {
    return this.httpWrapperService.post(['auth', 'login'], body, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }

  logout(): Observable<any> {
    return this.httpWrapperService.post(['auth', 'logout'], {}, [
      { key: 'Content-Type', value: 'application/json' }
    ]);
  }
}
