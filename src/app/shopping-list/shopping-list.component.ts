import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent {
  title = 'Shopping list';
  focusedItem: string;
  ingredients: any;

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.itemFocused.subscribe((item) => {
      this.focusedItem = item
    })
  }

  ngOnInit() {
    this.shoppingListService.setIngredients();
    this.ingredients = this.shoppingListService.ingredients;
  }

  addIngredient({ name, amount }) {
    this.shoppingListService.ingredients.set(name, amount);
  }

  deleteIngredient() {
    if (this.focusedItem) {
      this.shoppingListService.ingredients.delete(this.focusedItem);
    }
  }

  clearIngredients() {
    this.shoppingListService.ingredients.clear();
  }
}
