import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { recipesMock } from '../../mocks/recipesMock';
import { RecipeAPIService } from './recipe.api.service';

describe('Recipe API service', () => {
  let recipeApiService: RecipeAPIService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeAPIService],
    });

    recipeApiService = TestBed.inject(RecipeAPIService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should get all recipes', () => {
    recipeApiService.getRecipes().subscribe((recipes) => {
      expect(recipes).toBeTruthy();
      expect(recipes[0].name).toBe('Apple Pie 12');
    });

    const request = httpController.expectOne(
      'https://recipe-app-c2b4b-default-rtdb.firebaseio.com/recipes.json'
    );
    expect(request.request.method).toEqual('GET');
    request.flush(recipesMock);
  });

  it('should send delete item by id request', () => {
    const id = '-NPT4DGUEXMjoSWiGEGk';
    recipeApiService.deleteRecipeItem(id);
    const request = httpController.expectOne(
      `https://recipe-app-c2b4b-default-rtdb.firebaseio.com/recipes/${id}.json`
    );
    expect(request.request.method).toEqual('DELETE');
  });

  it('should save recipe item to DB', () => {
    const id = '-NPT4DGUEXMjoSWiGEGk';
    recipeApiService.postRecipe(recipesMock[id]).subscribe((response) => {
      expect(response['name']).toBeDefined();
      expect(response['name']).not.toBe(id);
    });

    const request = httpController.expectOne(
      'https://recipe-app-c2b4b-default-rtdb.firebaseio.com/recipes.json'
    );
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(recipesMock[id]);
    request.flush(recipesMock[id]);
  });

  it('should update recipe item in DB', () => {
    const id = '-NPT4DGUEXMjoSWiGEGk';
    recipeApiService.updateRecipeItem({ id, ...recipesMock[id]});
    const body = {
      '-NPT4DGUEXMjoSWiGEGk': {
        name: recipesMock[id].name,
        imagePath: recipesMock[id].imagePath,
        description: recipesMock[id].description,
        ingredients: recipesMock[id].ingredients,
      },
    };

    const request = httpController.expectOne(
      'https://recipe-app-c2b4b-default-rtdb.firebaseio.com/recipes.json'
    );
    expect(request.request.method).toEqual('PATCH');
    expect(request.request.body).toEqual(body);
    request.flush(body);
  });

  it('should throw error if save recipe fails', () => {
    const id = '-NPT4DGUEXMjoSWiGEGk';
    recipeApiService.postRecipe(recipesMock[id]).subscribe(
      () => fail('request shoud have failed'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const request = httpController.expectOne(
      'https://recipe-app-c2b4b-default-rtdb.firebaseio.com/recipes.json'
    );
    expect(request.request.method).toEqual('POST');

    request.flush('error', {
      status: 500,
      statusText: 'External Server Error',
    });
  });

  afterEach(() => {
    httpController.verify();
  });
});
