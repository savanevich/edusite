import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { AuthService } from '../../../auth/auth.service';
import { FOLLOW_USER, UNFOLLOW_USER } from './follow.constants';
import { User } from './../../user';
import { NotificationService } from '../../../common/notification/notification.service';

@Injectable()
export class FollowService {

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

  followUser(id: number) {
    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.post(FOLLOW_USER.replace(':userID', id.toString()),{}, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            console.log(response);
            const following = { id: response.data.followRelation.following.id };

            this.authService.authenticatedUser.followingUsers.push(following);
            console.log(this.authService.authenticatedUser);
            this.authService.authSuccess.emit(this.authService.authenticatedUser);
          }
        }), ((response) => {
          this.notificationService.notify(
            response.json().errors[0],
            'error'
          );
        })
      );
  }

  unfollowUser(id: number) {
    const options = new RequestOptions({ headers: this.authHeaders });

    return this.http.post(UNFOLLOW_USER.replace(':userID', id.toString()), {}, options)
      .map((response: Response) => response.json())
      .subscribe(
        ((response) => {
          if (response.hasOwnProperty('success') && response.success) {
            const removedIndex = this.authService.authenticatedUser.followingUsers.findIndex(((element) => {
              return +element.id === id;
            }));
            delete this.authService.authenticatedUser.followingUsers[removedIndex];

            this.authService.authSuccess.emit(this.authService.authenticatedUser);
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
