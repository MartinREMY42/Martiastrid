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

  public ipizza: IPizza;

  constructor(ipizza: IPizza) {
    this.ipizza = ipizza;
  }

  equals(other: Pizza) {
    if (this.ipizza.genericName === 'CustomPizza') {
      if (other.ipizza.genericName === 'CustomPizza') {
        console.log('deux pizzas custom vont etres comparées');
        // two custom need to be compared by their ingredients
        return listEquals(this.ipizza.ingredients, other.ipizza.ingredients);
      } else {
        console.log('une custom et une non custom');
        // this one is custom but not the other, different pizzas then
        return false;
      }
    }
    if (other.ipizza.genericName === 'CustomPizza') {
      console.log('une NON custom et une custom');
      // this one is standard but not the other, different pizzas then
      return false;
    }
    console.log('deux pizza génériques vont êtres comparées : ');
    console.log(other.ipizza.genericName + ' vs ' + this.ipizza.genericName);
    // two standard pizza compared by their generic name
    return other.ipizza.genericName === this.ipizza.genericName;
  }

}
