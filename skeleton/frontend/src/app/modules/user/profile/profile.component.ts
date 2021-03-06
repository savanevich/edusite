import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userId: number;
  public user: User;
  public activeLinkIndex: number = 1;

  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.userId = +params['id'];
      this.userService.fetchUser(this.userId);
    });

    this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
      }
    );

    this.authService.authSuccess.subscribe(
      (user: User) => {
        if (user.id === this.userId) {
          this.user = user;
        }
      }
    );

    this.user = this.userService.getUser();
  }

  isAuthUserProfile(): boolean {
    return this.userId === this.authService.getAuthUserId();
  }
}
