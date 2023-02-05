import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
})
export class ShoppingListItemComponent {
  focusedItem: string;
  @Input() ingredient: { key: string; value: number };
  @Output() ShoppingListItemEvent = new EventEmitter<string>();
  subscription: Subscription;

  constructor(private ShoppingListSertice: ShoppingListService) {
    this.subscription = this.ShoppingListSertice.itemFocused.subscribe((item) => {
        this.focusedItem = item
    })
  }

  onItemClick({ target }) {
    this.ShoppingListSertice.itemFocused.next(target.dataset.key); 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
