import {IIngredient} from './iingredient';

export interface IPizza {
  id: number;
  genericName: string;
  price: number;
  ingredients: IIngredient[];
  custom: boolean;
  category: string[];
}
