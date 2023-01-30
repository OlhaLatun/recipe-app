import { Component } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  title = 'Recipe List';
  clickedRecipe = this.recipeService.recipes[0];
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) {
    this.recipeService.clickedRecipe.subscribe((recipe) => {
      this.clickedRecipe = recipe
    })
  }

  ngOnInit() {
    this.recipes = this.recipeService.recipes;
  }
}
