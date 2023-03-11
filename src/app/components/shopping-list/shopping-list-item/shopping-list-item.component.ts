import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../../../services/shopping-list-service/shopping-list.service';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
})
export class ShoppingListItemComponent {
  focusedItem: string;
  @Input() ingredient: Ingredient;
  @Output() ShoppingListItemEvent = new EventEmitter<string>();
  subscription: Subscription;

  constructor(private ShoppingListSertice: ShoppingListService) {
    this.subscription = this.ShoppingListSertice.focusedItem.subscribe((item) => {
        this.focusedItem = item
    })
  }

  onItemClick({ target }) {
    this.ShoppingListSertice.focusedItem.next(target.dataset.key); 
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
