import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);

      return false;
    }
  }
}
