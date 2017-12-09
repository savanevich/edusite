import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { AuthService } from '../auth/auth.service';
import { FETCH_USERS_URL } from './user.constants';
import { User } from './user';
import { NotificationService } from '../notification/notification.service';


@Injectable()
export class UserService {

  private authHeaders: Headers;

  public user: User;
  public userChanged = new EventEmitter<User>();

  constructor(
    private authService: AuthService,
    private http: Http,
    private notificationService: NotificationService
  ) {
    this.authHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.authService.getAuthToken()
    });
  }

  fetchUser(id: number) {
    if (id === this.authService.getAuthUserId()) {
      this.user = this.authService.getAuthUser();
      this.userChanged.emit(this.user);

      return;
    }

    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.get(`${FETCH_USERS_URL}/${id}`, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            this.user = response.data.user;
            this.userChanged.emit(this.user);
          }
        }), ((response) => {
          this.notificationService.notify(
            response.json().errors[0],
            'error'
          );
        })
      );
  }
}
