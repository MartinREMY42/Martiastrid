import {Pizza} from './IPizza';

export class PizzaQuantity {
  pizza: Pizza;
  quantity: number;

  constructor(pizza: Pizza, quantity: number) {
    this.pizza = pizza;
    this.quantity = quantity;
  }

  equals(other: PizzaQuantity) {
    return this.pizza.equals(other.pizza);
  }
}
