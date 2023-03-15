import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styles: [
    `
      .customActive {
        color: #9400d3 !important;
      }
    `,
  ],
})
export class HeaderComponent {
  title = 'My Recipe Book';
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private auth: AuthService) {
    this.userSub = this.auth.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onInit() {
    // doesn't work from here
  }

  onDestroy() {
    this.userSub.unsubscribe();
  }
}