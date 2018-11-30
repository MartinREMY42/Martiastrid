import {IIngredient} from './iingredient';

export interface IPizza {
  id: number;
  genericName: string;
  price: number;
  ingredients: Set<IIngredient>;
  custom: boolean;
  category: Set<String>;
}
