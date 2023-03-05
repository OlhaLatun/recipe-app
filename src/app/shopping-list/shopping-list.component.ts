import { Component } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShoppingListAPIService } from '../services/shoppingList.api.service';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  title = 'Shopping list';
  focusedItem: string;
  ingredients: Ingredient[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private api: ShoppingListAPIService
  ) {
    this.shoppingListService.focusedItem.subscribe((item) => {
      this.focusedItem = item;
    });

    this.shoppingListService.ingredientsChanged.subscribe((data) => {
      if (!this.ingredients.length) {
        this.ingredients = data;
      } else {
        this.ingredients = this.shoppingListService.getIngredients();
      }
    });
  }

  ngOnInit() {
    this.shoppingListService.fetchIngredients();
  }

  addIngredient(item: { name: string; amount: number }) {
    const ingredient = new Ingredient(item.name, item.amount);
    this.shoppingListService.addIngredient(ingredient);
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
