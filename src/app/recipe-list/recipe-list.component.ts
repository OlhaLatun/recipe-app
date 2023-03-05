import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';
import { RecipeAPIService } from '../services/api/recipe.api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  title = 'Recipe List';
  recipeCLicked: Recipe;
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
  ) {}

  ngOnInit() {
    this.recipeService.setRecipes()

    this.recipeService.recipesChanges.subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
