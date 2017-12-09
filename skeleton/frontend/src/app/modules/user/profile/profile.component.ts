import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userId: number;
  public user: User = null;

  constructor(private router: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => this.userId = +params['id'] );

    this.userService.fetchUser(this.userId);
    this.userService.userChanged.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }
}
