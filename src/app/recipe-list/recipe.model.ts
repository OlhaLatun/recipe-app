import { Ingredient } from '../shopping-list/ingredient.model';

export class Recipe {
  public id?: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imgPath: string,
    ingredients: any,
    id?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = desc;
    (this.imagePath = imgPath), (this.ingredients = ingredients);
  }
}
