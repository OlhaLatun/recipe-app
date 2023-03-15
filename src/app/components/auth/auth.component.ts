import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AuthResponseData,
  AuthService,
} from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styles: [
    `
      input.ng-invalid .ng-touched {
        border-color: red;
      }
    `,
  ],
})
export class AuthComponent {
  @ViewChild('form') form: NgForm;
  isLoginMode: boolean = true;
  isLoading = false;
  isError = null;

  authObs = new Observable<AuthResponseData>();

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObs = this.auth.signIn(email, password);
    } else {
      this.authObs = this.auth.register(email, password);
    }

    this.authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.isLoading = false;
        this.isError = error;
      }
    );

    this.form.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  closeAlert() {
    this.isError = null;
  }
}
