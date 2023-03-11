import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { RecipeDetailComponent } from '../components/recipe-list/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../components/recipe-list/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from '../components/recipe-list/recipe-list.component';
import { ShoppingListComponent } from '../components/shopping-list/shopping-list.component'
import { AuthComponent } from '../components/auth/auth.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'auth', component: AuthComponent },
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
