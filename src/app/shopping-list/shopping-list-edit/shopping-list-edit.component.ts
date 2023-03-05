import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListAPIService } from 'src/app/services/api/shoppingList.api.service';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
})
export class ShoppingListEditComponent {
  @Output() shoppinglistAddEvent = new EventEmitter<object>();
  @Output() shoppinglistDeleteEvent = new EventEmitter<void>();
  @Output() shoppinglistClearEvent = new EventEmitter<void>();
  @ViewChild('form') slForm: NgForm;

  constructor(private api: ShoppingListAPIService) {}

  addIngredient() {
    if (this.slForm.touched) {
      const item = {
        name: this.slForm.value.name,
        amount: this.slForm.value.amount,
      }
      this.shoppinglistAddEvent.emit(item);
    }
    this.slForm.reset();
  }

  onDeleteIngredient() {
    this.shoppinglistDeleteEvent.emit();
  }

  onClearList() {
    this.shoppinglistClearEvent.emit();
  }
}
