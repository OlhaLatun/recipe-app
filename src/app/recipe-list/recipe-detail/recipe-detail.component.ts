import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const recipeId = params['id'];
      this.recipe = this.recipeService.getRecipeById(+recipeId);
    });
  }

  onRecipeDelete(id: number) {
    this.recipeService.deleteRecipe(id)
    this.router.navigate(['recipes'])
  }

  addToShoppingList(event) {
    event.preventDefault();
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
