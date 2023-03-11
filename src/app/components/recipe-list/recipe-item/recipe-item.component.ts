import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
}
