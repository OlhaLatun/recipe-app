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
  id: string;
  editMode: boolean;
  recipeToEdit: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    if (this.editMode) {
      let recipe = this.createRecipe()
      recipe.id = +this.id
      this.recipeService.updateRecipe(+this.id - 1, recipe);
    } else {
      this.recipeService.addRecipe(this.createRecipe());
    }

    this.recipeForm.reset();
  }

  createRecipe() {
    return new Recipe(
      this.recipeService.recipes.length + 1,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imgPath,
      this.recipeForm.value.ingredients
    );
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || null;
    this.editMode = !!this.id;
    this.recipeToEdit = this.recipeService.getRecipeById(+this.id);

    this.initForm();
  }

  private initForm() {
    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      name = this.recipeToEdit.name;
      description = this.recipeToEdit.description;
      imagePath = this.recipeToEdit.imagePath;
      if (this.recipeToEdit['ingredients']) {
        for (let ingr of this.recipeToEdit.ingredients) {
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount, Validators.required),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imgPath: new FormControl(imagePath, Validators.required),
      ingredients: ingredients,
    });
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredientForm() {
    let control = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });

    (<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  deleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx)
  }
}
