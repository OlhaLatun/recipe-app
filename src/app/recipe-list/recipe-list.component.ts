import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  title = 'Recipe List';
  recipeCLicked: Recipe;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
    this.recipeService.recipesChanges.subscribe(() => {
      this.recipes = this.recipeService.recipes;
    });
  }
}
