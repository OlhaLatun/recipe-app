import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe-service/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  title = 'Recipe List';
  recipeCLicked: Recipe;
  recipes: Recipe[] = [];
  isLoading = false
  isError: string = null

  constructor(
    private recipeService: RecipeService,
  ) {
    this.recipeService.isLoading.subscribe(status => {
      this.isLoading = status
    })
    this.recipeService.isError.subscribe(errorMessage => {
      console.log(errorMessage)
      this.isError = errorMessage['error']
    })
  }

  ngOnInit() {
    this.recipeService.setRecipes()

    this.recipeService.recipesChanges.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
