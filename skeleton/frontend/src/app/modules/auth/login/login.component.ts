import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  @Output() authErrors: EventEmitter<string[]> = new EventEmitter();

  errors: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authErrors.subscribe(
      (errors: string[]) => {
        this.errors = errors
      }
    );
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }
}
