import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
})
export class ShoppingListItemComponent {
  focusedItem: string;
  @Input() ingredient: { key: string; value: number };
  @Output() ShoppingListItemEvent = new EventEmitter<string>();

  constructor(private ShoppingListSertice: ShoppingListService) {
    this.ShoppingListSertice.itemFocused.subscribe((item) => {
        this.focusedItem = item
    })
  }

  onItemClick({ target }) {
    this.ShoppingListSertice.itemFocused.emit(target.dataset.key); 
  }

}
