import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  title = 'Shopping list';
  focusedItem: string;
  ingredients: any;

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.itemFocused.subscribe((item) => {
      this.focusedItem = item;
    });

    this.shoppingListService.ingredientsToAdd.subscribe((ingredients) => {
      ingredients.forEach((item) =>
        this.shoppingListService.addIngredient(item.name, item.amount)
      );
    });
  }

  ngOnInit() {
    this.shoppingListService.setIngredients();
    this.ingredients = this.shoppingListService.ingredients;
  }

  addIngredient({ name, amount }) {
    this.shoppingListService.addIngredient(name, amount);
  }

  deleteIngredient() {
    if (this.focusedItem) {
      this.shoppingListService.deleteIngredient(this.focusedItem);
    }
  }

  clearIngredients() {
    this.shoppingListService.clearList();
  }
}
