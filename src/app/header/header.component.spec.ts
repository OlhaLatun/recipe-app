import {
  ComponentFixture,
  tick,
  TestBed,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { HomeComponent } from '../home/home.component';

describe('Header component', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let location: Location;

  const routes = [
    { path: '', component: HomeComponent},
    { path: 'recipes', component: RecipeListComponent },
    { path: 'shoppingList', component: ShoppingListComponent },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    location = TestBed.inject(Location);
  });

  it('should create header instance', () => {
    const header = fixture.componentInstance;
    expect(header).toBeDefined();
  });

  it('should title be rendered in <a>', () => {
    const title = fixture.debugElement.query(
      By.css('.navbar-brand')
    ).nativeElement;
    fixture.detectChanges();
    expect(title.innerHTML).toBe('Recipe Book');
  });

  it('should navigate to home', fakeAsync(() => {
    fixture.debugElement.queryAll(By.css('a'))[0].nativeElement.click();
    tick();
    expect(location.path()).toBe('/');
  }));

  it('should navigate to recipe list', fakeAsync(() => {
    fixture.debugElement.queryAll(By.css('a'))[1].nativeElement.click();
    tick();
    expect(location.path()).toBe('/recipes');
  }));

  it('should navigate to shopping list', fakeAsync(() => {
    fixture.debugElement.queryAll(By.css('a'))[2].nativeElement.click();
    tick();
    expect(location.path()).toBe('/shoppingList');
  }));
  
});
