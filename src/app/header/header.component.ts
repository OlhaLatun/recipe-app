import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    selector: 'header',
     templateUrl: './header.component.html'
})

export class HeaderComponent {
    title = 'Recipe Book'
    @Output() NavigationEvent = new EventEmitter<string>()

    onNavigate(event) {
        this.NavigationEvent.emit(event.target.id)
    }
}