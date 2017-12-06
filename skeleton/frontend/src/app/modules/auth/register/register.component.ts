import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Registrant } from './registrant';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {

  @Input() registrant: Registrant;
  @Output() authErrors: EventEmitter<string[]> = new EventEmitter();

  errors: string[] = [];

  constructor(private authService: AuthService) {
    this.registrant = {
      name: null,
      email: null,
      password: null
    };
  }

  ngOnInit() {
    this.authService.authErrors.subscribe(
      (errors: string[]) => {
        this.errors = errors
      }
    );
  }

  onSubmit(form: NgForm) {
    const registrant = new Registrant(form.value.name, form.value.email, form.value.password);

    this.authService.register(registrant);
  }

}
