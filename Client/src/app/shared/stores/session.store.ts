import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStore {
  constructor(private authService: AuthService) {}

  get getUserName(): string {
    return localStorage.getItem('userName') || '';
  }

  get getIsAuth(): boolean {
    return localStorage.getItem('sessionExpiryDate')
      ? moment().valueOf() <
          moment(localStorage.getItem('sessionExpiryDate')).valueOf()
      : false;
  }

  login(body: { login: string; password: string }): Observable<any> {
    return this.authService.login(body);
  }

  logout(): Subscription {
    localStorage.removeItem('userName');
    localStorage.removeItem('sessionExpiryDate');
    return this.authService.logout().subscribe();
  }
}
