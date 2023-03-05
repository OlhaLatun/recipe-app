import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingListItemComponent } from './shopping-list/shopping-list-item/shopping-list-item.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-list/recipe-detail/recipe-detail.component';
import { HoverDirective } from './directives/hover.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { HomeComponent } from './home/home.component';
import { AppRouterModule } from './modules/router.module';
import { RecipeEditComponent } from './recipe-list/recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';
import { ReversePipe } from './pipes/reverse.pipe'
import { SortPipe } from './pipes/sort.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListAPIService } from './services/api/shoppingList.api.service';

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
    LoginComponent,
    ReversePipe,
    SortPipe
  ],
  imports: [BrowserModule, FormsModule, AppRouterModule, ReactiveFormsModule, HttpClientModule],
  providers: [ShoppingListService, RecipeService, ShoppingListAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
