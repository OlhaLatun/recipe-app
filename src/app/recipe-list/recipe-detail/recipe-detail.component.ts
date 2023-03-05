import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeAPIService } from 'src/app/services/recipe.api.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  title = 'Recipe Detail';
  recipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private api: RecipeAPIService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(recipeId);
    });
  }

  onRecipeDelete(id: string) {
    this.recipeService.deleteRecipe(id)
    this.router.navigate(['recipes'])
  }

  addToShoppingList(event) {
    event.preventDefault();
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
