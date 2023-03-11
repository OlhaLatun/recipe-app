import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

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

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    if (this.isLoginMode) {
      this.auth.signIn(email, password).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['recipes']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.auth.register(email, password).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['recipes']);
        },
        (error) => {
          console.log(error);
        }
      );
    }

 
    this.form.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
