import { Recipe } from '../recipe-list/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shopping-list/ingredient.model';
import { ShoppingListAPIService } from './api/shoppingList.api.service';
import { RecipeAPIService } from './api/recipe.api.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipes: Recipe[] = [
    // new Recipe(
    //   1,
    //   'Tiramisu',
    //   'Delicious decert from Italia',
    //   'https://thumbs.dreamstime.com/b/tiramisu-blue-plate-32105094.jpg',
    //   [
    //     { name: 'mascarpone', amount: 1 },
    //     { name: 'savoiardi', amount: 1 },
    //     { name: 'coffee', amount: 1 },
    //     { name: 'cream', amount: 1 },
    //   ]
    // ),
    // new Recipe(
    //   2,
    //   'Pizza',
    //   'What can be better than melting cheese?',
    //   'https://thumbs.dreamstime.com/z/pizza-rustic-italian-mozzarella-cheese-basil-leaves-35669930.jpg',
    //   [
    //     { name: 'dough', amount: 1 },
    //     { name: 'mozarella', amount: 1 },
    //     { name: 'tomato', amount: 1 },
    //     { name: 'seasoning', amount: 1 },
    //   ]
    // ),
    // new Recipe(
    //   3,
    //   'Lasagna',
    //   'Layers of divine taste',
    //   'https://thumbs.dreamstime.com/z/lasagna-5660129.jpg',
    //   [
    //     { name: 'lasagna pasta', amount: 1 },
    //     { name: 'tomato sause', amount: 1 },
    //     { name: 'meat', amount: 1 },
    //     { name: 'beshamel', amount: 1 },
    //     { name: 'cheese', amount: 1 },
    //   ]
    // ),
  ];

  recipesChanges = new Subject<Recipe[]>();
  constructor(
    private shopListService: ShoppingListService,
    private slApi: ShoppingListAPIService,
    private recipeApi: RecipeAPIService
  ) {}

  setRecipes() {
    this.recipeApi.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.recipesChanges.next(data);
    });
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    ingredients.forEach((item) => {
      const exists = this.shopListService.ingredients.find(
        (i) => i.name.toLowerCase() === item.name.toLocaleLowerCase()
      );

      if (!exists) {
        this.slApi.postShoppingListItem(item);
        this.shopListService.fetchIngredients();
      }
    });
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanges.next(this.recipes);
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    const filtered = this.recipes.filter((recipe) => recipe.id !== id);
    this.recipes = filtered;
    this.recipes.push(newRecipe)
    this.recipeApi.updateRecipeItem(newRecipe)
    this.recipesChanges.next(this.recipes)
  }

  deleteRecipe(id: string) {
    const filtered = this.recipes.filter((recipe) => recipe.id !== id);
    this.recipes = filtered;
    this.recipesChanges.next(filtered);
    this.recipeApi.deleteRecipeItem(id)
  }

  getRecipeById(id: string) {
    return this.recipes.find((recipe) => recipe.id === id);
  }
}
