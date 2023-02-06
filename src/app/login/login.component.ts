import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [
    `
      input.ng-invalid .ng-touched {
        border-color: red;
      }
    `,
  ],
})
export class LoginComponent {
  @ViewChild('form') form: NgForm;

  constructor(private router: Router) {}
  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['recipes']);
    }
  }
}
