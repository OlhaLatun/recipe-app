import { Component } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipe.service";

@Component({
    selector:'recipe-detail',
     templateUrl: './recipe-detail.component.html'
})

export class RecipeDetailComponent {
    title = 'Recipe Detail'
     recipe: Recipe;

    constructor(private recipeService: RecipeService) {
        this.recipeService.clickedRecipe.subscribe((item) => {
            this.recipe = item
        })
    }

    ngOnInit() {
        this.recipe = this.recipeService.recipes[0]
    }
    
}