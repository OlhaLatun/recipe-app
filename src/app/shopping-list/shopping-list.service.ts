import { EventEmitter } from '@angular/core';
import { Ingredient } from './ingredient.model';

export class ShoppingListService {
  ingredients = new Map();
  itemFocused = new EventEmitter<string>();
  ingredientsToAdd = new EventEmitter<Ingredient[]>();

  setIngredients() {
    this.ingredients.set('pasta', 1);
    this.ingredients.set('cheese', 1);
    this.ingredients.set('meat', 1);
    this.ingredients.set('tomatoes', 10);
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.set(name, amount);
  }

  deleteIngredient(name: string) {
    this.ingredients.delete(name);
  }

  clearList() {
    this.ingredients.clear();
  }

  
}
