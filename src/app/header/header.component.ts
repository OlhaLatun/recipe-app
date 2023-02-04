import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styles: [
    `
      .customActive {
        color: #9400D3 !important;
      }
    `,
  ],
})
export class HeaderComponent {
  title = 'Recipe Book';
  @Output() NavigationEvent = new EventEmitter<string>();
}
