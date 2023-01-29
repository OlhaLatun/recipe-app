import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent {
 
  @Output() shoppinglistAddEvent = new EventEmitter<object>();
  @Output() shoppinglistDeleteEvent = new EventEmitter<void>();
  @Output() shoppinglistClearEvent = new EventEmitter<void>();
  @ViewChild('ingredientName') ingredientName: ElementRef 
  @ViewChild('ingredientAmount') ingredientAmount: ElementRef 

  onAddIngredient(event) {
    event.preventDefault();
    if (this.ingredientName.nativeElement.value && this.ingredientAmount.nativeElement.value) {
       this.shoppinglistAddEvent.emit({
        name: this.ingredientName.nativeElement.value,
        amount: this.ingredientAmount.nativeElement.value
       })
    }
  }

  onDeleteIngredient() {
   this.shoppinglistDeleteEvent.emit()
  }

  onClearList() {
    this.shoppinglistClearEvent.emit()
  }
}
