import {Injectable} from '@angular/core';
import {Pizza} from '../../models/IPizza';
import {AuthenticationService} from '../../services/authentication.service';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private authenticationService: AuthenticationService) {
  }

  getCart(): IPizzaQuantity[] {
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  setCart(cart: IPizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }

  addToCart(addedPizzasQuantity: IPizzaQuantity[]): IPizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      console.log('todo');
      return null;
    } else {
      const cart: IPizzaQuantity[] = this.getCart();
      const pizzas: Pizza[] = cart.map( ipq => new Pizza(ipq.pizza));
      console.log('old cart : ' + JSON.stringify(cart));
      let i = 0;
      let j;
      let currentPQ: IPizzaQuantity;
      let currentPizza: Pizza;
      while (i < addedPizzasQuantity.length) {
        currentPQ = addedPizzasQuantity[i];
        currentPizza = new Pizza(currentPQ.pizza);
        j = indexOf(pizzas, currentPizza);
        if (j === -1) {
          // nouvelle pizza
          console.log(JSON.stringify(currentPizza) + ' is new');
          cart.push(currentPQ);
        } else {
          console.log(JSON.stringify(currentPizza) + ' is already there !!!!! ');
          cart[i] = {
            pizza: addedPizzasQuantity[i].pizza,
            quantity: currentPQ.quantity + cart[j].quantity
          };
        }
        i++;
      }
      this.setCart(cart);
      console.log('new cart : ' + JSON.stringify(cart));
      return cart;
    }
  }

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
