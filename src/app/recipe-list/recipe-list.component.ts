import { Component } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  title = 'Recipe List';
  recipes: Recipe[] = [
    new Recipe(
      'Tiramisu',
      'Delicious decert from Italia',
      'https://thumbs.dreamstime.com/b/tiramisu-blue-plate-32105094.jpg',
      ['mascarpone', 'savoiardi', 'coffee', 'cream']
    ), new Recipe(
      'Pizza',
      'What can be better than melting cheese?',
      'https://thumbs.dreamstime.com/z/pizza-rustic-italian-mozzarella-cheese-basil-leaves-35669930.jpg',
      ['dough', 'mozarella', 'pomato sause', 'seasoning']
    ),  new Recipe(
      'Lasagna',
      'Layers of divine taste',
      'https://thumbs.dreamstime.com/z/lasagna-5660129.jpg',
      ['lasagna pasta', 'tomato sause', 'meat', 'beshamel', 'cheese']
    )
  ];
  clickedRecipe = this.recipes[0];

  onRecipeClick(recipe: string) {
  const r = this.recipes.find(r => r.name === recipe)
  this.clickedRecipe = r
  }
}
