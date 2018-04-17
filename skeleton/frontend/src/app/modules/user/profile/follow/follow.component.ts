import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../user';
import { AuthService } from '../../../auth/auth.service';
import { FollowService } from './follow.service';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  @Input() currentProfileId: number;

  public authenticatedUser: User;

  constructor(private authService: AuthService, private followService: FollowService) { }

  ngOnInit() {
    this.authenticatedUser = this.authService.getAuthUser();
    this.authService.authSuccess.subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  isFollowing(): boolean {
    return this.authenticatedUser && this.authenticatedUser.followingUsers.some((follower) => {
      return +follower.id === this.currentProfileId;
    });
  }

  followUser() {
    this.followService.followUser(this.currentProfileId);
  }

  unfollowUser() {
    this.followService.unfollowUser(this.currentProfileId);
  }
}
