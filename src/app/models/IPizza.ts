import {Ingredient} from './iingredient';
import {listEquals} from '../utils/list-util';

export interface IPizza {
  id: number;
  genericName: string;
  price: number;
  ingredients: Ingredient[];
  custom: boolean;
  category: string[];
}

export class Pizza {

  id: number;
  genericName: string;
  price: number;
  ingredients: Ingredient[];
  custom: boolean;
  category: string[];

  constructor(id: number,
              genericName: string,
              price: number,
              ingredients: Ingredient[],
              custom: boolean,
              category: string[]) {
    this.id = id;
    this.genericName = genericName;
    this.price = price;
    this.ingredients = ingredients;
    this.custom = custom;
    this.category = category;
  }

  equals(other: Pizza) {
    if (this.genericName === 'CustomPizza') {
      if (other.genericName === 'CustomPizza') {
        console.log('deux pizzas custom vont etres comparées');
        // two custom need to be compared by their ingredients
        return listEquals(this.ingredients, other.ingredients);
      } else {
        console.log('une custom et une non custom');
        // this one is custom but not the other, different pizzas then
        return false;
      }
    }
    if (other.genericName === 'CustomPizza') {
      console.log('une NON custom et une custom');
      // this one is standard but not the other, different pizzas then
      return false;
    }
    console.log('deux pizza génériques vont êtres comparées : ');
    console.log(other.genericName + ' vs ' + this.genericName);
    // two standard pizza compared by their generic name
    return other.genericName === this.genericName;
  }

}
