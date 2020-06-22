import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { IAuthUser } from '../../shared/models/auth.model';
import { SessionStore } from '../../shared/stores/session.store';

@Component({
  selector: 'ngx-apos-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  admin = { login: '', password: '' };
  loginError: boolean;

  constructor(private sessionStore: SessionStore, private router: Router) {}

  login() {
    this.sessionStore
      .login({
        login: this.admin.login,
        password: this.admin.password
      })
      .subscribe(
        (data: IAuthUser) => {
          localStorage.setItem('userName', 'Admin of AposCTS');
          localStorage.setItem('sessionExpiryDate', data.sessionExpiryDate);
          this.redirectToSettings();
        },
        () => {
          this.loginError = true;
        }
      );
  }

  ngAfterViewInit() {
    const q: any = document.getElementsByTagName('nb-card-header')[0];
    q.style.display = 'none';
  }

  redirectToSettings() {
    this.router.navigate(['/pages/settings']);
  }
}
