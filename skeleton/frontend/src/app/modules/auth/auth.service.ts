import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { REGISTER_URL, LOGIN_URL, FETCH_AUTH_USER } from './auth.constants';
import { Registrant } from './register/registrant';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import { User} from '../user/user';

@Injectable()

export class AuthService {
  private authHeaders: Headers;

  public authErrors = new EventEmitter<string[]>();
  public authenticatedUser: User = null;

  constructor(private http: Http, private router: Router, private notificationService: NotificationService) {
    this.authHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.getAuthToken()
    });
  }

  getAuthUser(): User {
    return this.authenticatedUser;
  }

  getAuthUserId(): number {
    if (this.authenticatedUser) {
      return +this.authenticatedUser.id
    }

    return -1;
  }

  getAuthToken(): string {
    return localStorage.getItem('token');
  }

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
            this.authenticatedUser = response.data.user;

            this.router.navigate(['/dashboard']);
          }
        }), ((response) => {
          this.authErrors.emit(response.json().errors);
        })
      );
  }

  fetchAuthenticatedUser() {
    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.get(FETCH_AUTH_USER, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
        if (response.hasOwnProperty('success') && response.success) {
          this.authenticatedUser = response.data.user;
        }
      }), (() => {
          this.logOut();
      }));
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
  }
}