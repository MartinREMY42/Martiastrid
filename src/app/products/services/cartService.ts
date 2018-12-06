import {Injectable} from '@angular/core';
import {Pizza} from '../../models/IPizza';
import {AuthenticationService} from '../../services/authentication.service';
import {PizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private authenticationService: AuthenticationService) {
  }

  getCart(): PizzaQuantity[] {
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  setCart(cart: PizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }

  addToCart(addedPizzaQuantities: PizzaQuantity[]): PizzaQuantity[] {
    // return the merged cart
    if (this.authenticationService.isLoggedIn()) {
      console.log('todo');
      return null;
    } else {
      const cart: PizzaQuantity[] = this.getCart();
      console.log('old cart : ' + JSON.stringify(cart));
      let indexPQ = 0;
      let currentPQ: PizzaQuantity;
      let indexDoublePQ: number;
      let doublePizza: Pizza;
      let doubleQuantity: number;
      while (indexPQ < addedPizzaQuantities.length) {
        currentPQ = addedPizzaQuantities[indexPQ];
        // for each pizza-quantity to be added to the cart
        indexDoublePQ = indexOf(cart, currentPQ);
        if (indexDoublePQ > 0) {
          // si il y en a déjà dans le cart
          doublePizza = cart[indexDoublePQ].pizza
          doubleQuantity = cart[indexDoublePQ].quantity;
          cart[indexDoublePQ] = new PizzaQuantity(doublePizza, doubleQuantity + currentPQ.quantity);
        } else {
          cart.push(currentPQ);
        }
        indexPQ++;
      }
      this.setCart(cart);
      console.log('new cart : ' + JSON.stringify(cart));
      return cart;
    }
  }

  /*
  oldAddToCart(addedPizzasQuantity: PizzaQuantity[]): PizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      console.log('todo');
      return null;
    } else {
      const cart: PizzaQuantity[] = this.getCart();
      const pizzas: Pizza[] = cart.map( ipq => new Pizza(pq.pizza));
      console.log('old cart : ' + JSON.stringify(cart));
      let indexAddedPizza = 0;
      let j;
      let currentPQ: PizzaQuantity;
      let currentPizza: Pizza;
      while (indexAddedPizza < addedPizzasQuantity.length) {
        currentPQ = addedPizzasQuantity[indexAddedPizza];
        currentPizza = new Pizza(currentPQ.pizza);
        j = indexOf(pizzas, currentPizza);
        if (j === -1) {
          // nouvelle pizza
          console.log(JSON.stringify(currentPizza) + ' is new');
          cart.push(currentPQ);
        } else {
          console.log(JSON.stringify(currentPizza) + ' is already there !!!!! ');
          cart[indexAddedPizza] = {
            pizza: addedPizzasQuantity[indexAddedPizza].pizza,
            quantity: currentPQ.quantity + cart[j].quantity
          };
        }
        indexAddedPizza++;
      }
      this.setCart(cart);
      console.log('new cart : ' + JSON.stringify(cart));
      return cart;
    }
  } */

  /*contained(element: IPizzaQuantity, array: IPizzaQuantity[]) {
    let found = false;
    let index = 0;
    let currentPizza: IPizza;
    while (!found && (index < array.length)) {
      currentPizza = array[index].pizza;
      found = new Pizza(currentPizza).equals(new Pizza(element.pizza));
      index++;
  }
}*/

}
