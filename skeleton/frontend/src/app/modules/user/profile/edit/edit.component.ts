import { Component, OnInit } from '@angular/core';
import  {User } from "../../user";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditProfileComponent implements OnInit {

  public authenticatedUser: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authenticatedUser = this.authService.getAuthUser();
    this.authService.authSuccess.subscribe((user: User) => {
      this.authenticatedUser = user;
    });
  }

  editProfile() {
    this.authService.updateAuthenticatedUser(this.authenticatedUser.name, this.authenticatedUser.email);
  }
}
