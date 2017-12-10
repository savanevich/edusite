import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/auth.service';
import { User } from './modules/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public authenticatedUser: User;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.authService.fetchAuthenticatedUser();
    }

    this.authService.authSuccess.subscribe((user: User) => {
      this.authenticatedUser = user;
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
  }
}
