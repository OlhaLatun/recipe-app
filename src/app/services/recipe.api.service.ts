import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe-list/recipe.model';

const url = 'https://recipe-app-c2b4b-default-rtdb.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class RecipeAPIService {
  constructor(private http: HttpClient) {}

  postRecipe(recipe: Recipe) {
    return this.http.post(`${url}/recipes.json`, recipe);
  }

  getRecipes() {
   return this.http
      .get<Recipe[]>(`${url}/recipes.json`)
      .pipe(
        map((response) => {
          const recipes = [];
          for (let item in response) {
            recipes.push({ id: item, ...response[item] });
          }
          return recipes;
        }))
      
  }

  updateRecipeItem(item) {
    const body = {
      [item.id]: {
        name: item.name,
        description: item.description,
        imagePath: item.imgPath,
        ingredients: item.ingredients,
      },
    };
    this.http.patch(`${url}/recipes.json`, body).subscribe();
  }

  deleteRecipeItem(id: string) {
    this.http.delete(`${url}/recipes/${id}.json`).subscribe();
  }
}
