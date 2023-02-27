import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../shopping-list/ingredient.model';
import { ShoppingListAPIService } from './shoppingList.api.service';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredients: Ingredient[] = [];
  focusedItem = new Subject<string>();
  ingredientsChanged = new BehaviorSubject(this.ingredients);

  constructor(private api: ShoppingListAPIService) {}

  fetchIngredients() {
    this.api
      .getShoppingListIems()
      .pipe(
        map((data) => {
          let array = [];
          for (let item in data) {
            array.push({ id: item, ...data[item] });
          }
          return array;
        })
      )
      .subscribe((ingredients) => {
        this.ingredientsChanged.next(ingredients);
      });
  }

  setIngredients(data) {
    this.ingredients = data;
  }

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(item: Ingredient) {
    const exists = this.ingredients.find((ing) => ing.name === item.name);
    if (!exists) {
      this.api.postShoppingListItem(item);
      this.ingredients.push(item);
      this.ingredientsChanged.next([item]);
    } else {
      let toUpdate = {
        id: exists.id,
        name: exists.name,
        amount: item.amount,
      };

      this.api.updateShoppingListItem(toUpdate);
      this.ingredients = this.ingredients.filter(
        (item) => item.name !== exists.name
      );
      this.ingredients.push(toUpdate);
      this.ingredientsChanged.next([toUpdate]);
    }
  }

  deleteIngrdient(name) {
    const id = this.ingredients.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    ).id;
    this.api.deleteShoppingListItem(id);
  
    const filtered = this.ingredients.filter((item) => item.name !== name);
    this.ingredients = filtered;
    this.ingredientsChanged.next(filtered);
  }

  clearList() {
    this.ingredients = []
    this.ingredientsChanged.next(this.ingredients)
    this.api.clearShoppingList()
  }
}
