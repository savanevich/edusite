import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { REGISTER_URL, LOGIN_URL } from './auth.constants';
import { Registrant } from './register/registrant';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  userRegistered = new EventEmitter<void>();
  authErrors = new EventEmitter<string[]>();

  constructor(private http: Http, private router: Router) {}

  register(registrant: Registrant) {
    const headers = new Headers({'Content-type': 'application/json'});
    const body = {
      name: registrant.name,
      email: registrant.email,
      password: registrant.password
    };

    return this.http.post(REGISTER_URL, body, headers)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.userRegistered.emit();
          }
        }), ((response) => {
          this.authErrors.emit(response.json().errors);
        })
      );
  }

  login(email: string, password: string) {
    const headers = new Headers({'Content-type': 'application/json'});

    return this.http.post(LOGIN_URL, { email: email, password: password }, headers)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.user);

            this.router.navigate(['/dashboard']);
          }
        }), ((response) => {
          this.authErrors.emit(response.json().errors);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return !!(user && token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
