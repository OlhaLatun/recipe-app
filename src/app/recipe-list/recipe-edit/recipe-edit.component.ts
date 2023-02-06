import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent {
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService) {}

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeService.recipes.length + 1,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imgPath,
      this.recipeForm.value.ingredients
    )

    this.recipeService.addRecipe(newRecipe)
    this.recipeForm.reset()
  }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imgPath: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  addIngredientForm() {
    const control = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }
}
