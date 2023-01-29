import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Recipe } from "../recipe.model";

@Component({
    selector:'recipe-item',
     templateUrl: './recipe-item.component.html'
})

export class RecipeItemComponent {
    @Input() recipe: Recipe;
    @Output() RecipeItemEvent = new EventEmitter<string>()

    onRecipeItemClick(itemName: string) {
        this.RecipeItemEvent.emit(itemName)
    }
}