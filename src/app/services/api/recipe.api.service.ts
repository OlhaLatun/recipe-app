import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { AuthService } from '../auth-service/auth.service';

const url = 'https://recipe-app-c2b4b-default-rtdb.firebaseio.com';

@Injectable({ providedIn: 'root' })
export class RecipeAPIService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  postRecipe(recipe: Recipe) {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        const options = {
          params: new HttpParams().set('auth', user.token),
        };
        return this.http.post(`${url}/recipes.json`, recipe, options);
      })
    );
  }

  getRecipes() {
    return this.auth.user.pipe(
      take(1),
      exhaustMap((user) => {
        const options = {
          params: new HttpParams().set('auth', user.token),
        };
        return this.http.get<Recipe[]>(`${url}/recipes.json`, options);
      }),
      map((response) => {
        const recipes = [];
        for (let item in response) {
          recipes.push({ id: item, ...response[item] });
        }
        return recipes;
      })
    );
  }

  updateRecipeItem(item) {
    const body = {
      [item.id]: {
        name: item.name,
        description: item.description,
        imagePath: item.imagePath,
        ingredients: item.ingredients,
      },
    };

    this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          const options = {
            params: new HttpParams().set('auth', user.token),
          };
          return this.http.patch(`${url}/recipes.json`, body, options);
        })
      )
      .subscribe();
  }

  deleteRecipeItem(id: string) {
    this.auth.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          const options = {
            params: new HttpParams().set('auth', user.token),
          };
          return this.http.delete(`${url}/recipes/${id}.json`, options);
        })
      )
      .subscribe();
  }
}
