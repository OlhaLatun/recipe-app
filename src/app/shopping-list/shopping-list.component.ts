import { Component }  from '@angular/core';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent {
  title = 'Shopping list';
  focusedItem: string;
  ingredients = new Map();

  ngOnInit() {
    this.ingredients.set('pasta', 1)
    this.ingredients.set('cheese', 1)
    this.ingredients.set('meat', 1)
    this.ingredients.set('tomatoes', 10)
  }

  addIngredient({name, amount}) {
    this.ingredients.set(name, amount)
  }

  onListItemClick(itemID: string) {
    this.focusedItem = itemID
  }

  deleteIngredient() {
      if (this.focusedItem) {
          this.ingredients.delete(this.focusedItem)
      }
  
  }

  clearIngredients() {
    this.ingredients.clear()
  }
}
