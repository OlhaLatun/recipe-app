import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent {
  onFormSubmit(form: NgForm) { 
    console.log(form)

  }
}
