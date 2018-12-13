import {Ingredient} from './Ingredient';

export interface Recipe {
  id: number;
  ingredient: Ingredient;
  quantity: number;
}
