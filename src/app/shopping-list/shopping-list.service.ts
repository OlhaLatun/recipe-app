import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.model';

export class ShoppingListService {
  ingredients = new Map();
  itemFocused = new Subject<string>();
  ingredientsToAdd = new Subject<Ingredient[]>();

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
