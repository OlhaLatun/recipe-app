import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { ShoppingListEditComponent } from './components/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListItemComponent } from './components/shopping-list/shopping-list-item/shopping-list-item.component';
import { RecipeItemComponent } from './components/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe-list/recipe-detail/recipe-detail.component';
import { HoverDirective } from './directives/hover.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeService } from './services/recipe-service/recipe.service';
import { ShoppingListService } from './services/shopping-list-service/shopping-list.service';
import { HomeComponent } from './components/home/home.component';
import { AppRouterModule } from './modules/router.module';
import { RecipeEditComponent } from './components/recipe-list/recipe-edit/recipe-edit.component';
import { ReversePipe } from './pipes/reverse.pipe'
import { SortPipe } from './pipes/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListAPIService } from './services/api/shoppingList.api.service';
import { AuthComponent } from './components/auth/auth.component';
import {  LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ShoppingListItemComponent,
    HoverDirective,
    DropdownDirective,
    HomeComponent,
    RecipeEditComponent,
    AuthComponent,
    ReversePipe,
    SortPipe,
    LoadingSpinnerComponent
  ],
  imports: [BrowserModule, FormsModule, AppRouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [ShoppingListService, RecipeService, ShoppingListAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
