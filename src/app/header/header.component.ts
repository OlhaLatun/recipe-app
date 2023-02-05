import { Component, EventEmitter, Output } from '@angular/core';

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
  title = 'Recipe Book';
}
