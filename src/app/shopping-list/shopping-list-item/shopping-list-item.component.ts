import { Component, EventEmitter, Output, Input } from '@angular/core'

@Component({
    selector: 'shopping-list-item',
    templateUrl: './shopping-list-item.component.html'
})

export class ShoppingListItemComponent {
    focusedItem: string;
   @Input() ingredient: any;
   @Output() ShoppingListItemEvent = new EventEmitter<string>()

    onItemClick({target}) {
        this.ShoppingListItemEvent.emit(target.dataset.key)
        this.focusedItem = target.dataset.key
    }

}