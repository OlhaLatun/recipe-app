import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core'

export class RecipeService {
    recipes: Recipe[] = [
        new Recipe(
          'Tiramisu',
          'Delicious decert from Italia',
          'https://thumbs.dreamstime.com/b/tiramisu-blue-plate-32105094.jpg',
          [
            { name: 'mascarpone', amount: 1 },
            { name: 'savoiardi', amount: 1 },
            { name: 'coffee', amount: 1 },
            { name: 'cream', amount: 1 },
          ]
        ),
        new Recipe(
          'Pizza',
          'What can be better than melting cheese?',
          'https://thumbs.dreamstime.com/z/pizza-rustic-italian-mozzarella-cheese-basil-leaves-35669930.jpg',
          [
            { name: 'dough', amount: 1 },
            { name: 'mozarella', amount: 1 },
            { name: 'tomato', amount: 1 },
            { name: 'seasoning', amount: 1 },
          ]
        ),
        new Recipe(
          'Lasagna',
          'Layers of divine taste',
          'https://thumbs.dreamstime.com/z/lasagna-5660129.jpg',
          [
            { name: 'lasagna pasta', amount: 1 },
            { name: 'tomato sause', amount: 1 },
            { name: 'meat', amount: 1 },
            { name: 'beshamel', amount: 1 },
            { name: 'cheese', amount: 1 },
          ]
        ),
      ];

     clickedRecipe = new EventEmitter<Recipe>()
}