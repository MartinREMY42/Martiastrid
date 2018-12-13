import {listEquals} from '../utils/list-util';
import {Recipe, RecipeComparable} from './Recipe';

export interface Pizza {
  id?: number;
  genericName: string;
  price: number;
  recipes: Recipe[];
  favorite?: boolean;
  category: string[];
}

export class PizzaComparable {

  public pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  equals(other: PizzaComparable) {
    if (this.pizza.genericName === 'CustomPizza') {
      if (other.pizza.genericName === 'CustomPizza') {
        // two custom need to be compared by their ingredients
        return listEquals(this.pizza.recipes
            .map(recipe => new RecipeComparable(recipe)),
          other.pizza.recipes.map(recipe => new RecipeComparable(recipe)));
      } else {
        // this one is custom but not the other, different pizzas then
        return false;
      }
    }
    if (other.pizza.genericName === 'CustomPizza') {
      // this one is standard but not the other, different pizzas then
      return false;
    }
    // two standard pizza compared by their generic name
    return other.pizza.genericName === this.pizza.genericName;
  }

}
