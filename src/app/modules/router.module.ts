import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../directives/login/login.component';
import { HomeComponent } from '../home/home.component';
import { RecipeDetailComponent } from '../recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe-list/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: 'recipes',
    component: RecipeListComponent,
    children: [
      { path: 'create', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ],
  },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
