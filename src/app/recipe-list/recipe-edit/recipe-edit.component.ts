import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { RecipeAPIService } from 'src/app/services/recipe.api.service';

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
    private route: ActivatedRoute,
    private api: RecipeAPIService
  ) {}

  onSubmit() {
    if (this.editMode) {
      let recipe = this.createRecipe(this.id);
      this.recipeService.updateRecipe(this.id, recipe);
      this.recipeForm.reset();
    } else {
      this.api
        .postRecipe(this.createRecipe())
        .pipe(map((response) => response['name']))
        .subscribe((id) => {
          const newItem = this.createRecipe(id);
          this.recipeService.addRecipe(newItem);
          this.recipeForm.reset();
        });
    }
  }

  createRecipe(id?: string) {
    return new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imgPath,
      this.recipeForm.value.ingredients,
      id
    );
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'] || null;
    this.editMode = !!this.id;
    this.recipeToEdit = this.recipeService.getRecipeById(this.id);

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
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  }
}
