import { Component } from '@angular/core';
import { RecipeService } from './services/recipe-service/recipe.service';
import { ShoppingListService } from './services/shopping-list-service/shopping-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShoppingListService, RecipeService],
})
export class AppComponent {}
