import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStore } from '../../shared/stores/session.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private sessionStore: SessionStore
    ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let _request: HttpRequest<any>;

    if (req.url.indexOf('auth/login') === -1) {
      _request = req.clone();
      if (!localStorage.getItem('sessionExpiryDate')) {
        this.router.navigate(['/auth/login']);
      } else if (!this.sessionStore.getIsAuth) {
        this.router.navigate(['/auth/login']);
      }
    } else {
      _request = req.clone();
    }

    return next.handle(_request);
  }
}
