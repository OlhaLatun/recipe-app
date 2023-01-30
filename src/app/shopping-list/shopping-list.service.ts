import { EventEmitter } from "@angular/core";

export class ShoppingListService {
  ingredients = new Map();
  itemFocused = new EventEmitter<string>()

  setIngredients() {
    this.ingredients.set('pasta', 1);
    this.ingredients.set('cheese', 1);
    this.ingredients.set('meat', 1);
    this.ingredients.set('tomatoes', 10);
  }
 
}
