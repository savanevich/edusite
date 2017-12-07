import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { REGISTER_URL, LOGIN_URL } from './auth.constants';
import { Registrant } from './register/registrant';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';

@Injectable()

export class AuthService {
  authErrors = new EventEmitter<string[]>();

  constructor(private http: Http, private router: Router, private notificationService: NotificationService) {}

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

            this.notificationService.notify(
              'Successfully registered. Now you can login into the system using your credentials.',
              'success'
            );
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
