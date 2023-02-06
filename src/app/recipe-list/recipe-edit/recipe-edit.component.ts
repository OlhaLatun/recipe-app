import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent {
  recipeForm: FormGroup;
  editModeItemId: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    if (this.editModeItemId) {
      this.updateRecipe(this.editModeItemId);
    } else {
      this.addNewRecipe();
    }

    this.recipeForm.reset();
  }

  updateRecipe(id) {
    console.log(id);
  }

  filloutTheForm(id: number) {
    // form doesnt fill out ingredients + how to update recipe
    const recipeToEdit = this.recipeService.recipes.find((r) => r.id === id);
    this.recipeForm.setValue({
      name: recipeToEdit.name,
      description: recipeToEdit.description,
      imgPath: recipeToEdit.imagePath,
      ingredients: recipeToEdit.ingredients,
    });
  }

  addNewRecipe() {
    const newRecipe = new Recipe(
      this.recipeService.recipes.length + 1,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imgPath,
      this.recipeForm.value.ingredients
    );

    this.recipeService.addRecipe(newRecipe);
  }

  ngOnInit() {
    this.editModeItemId = +this.route.snapshot.params['id'];

    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imgPath: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
    });

    if (this.editModeItemId) {
      this.filloutTheForm(this.editModeItemId);
    }
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
