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

  addToCart(addedIPizzaQuantities: IPizzaQuantity[]): IPizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      console.log('todo');
      return null;
    } else {
      const cart: IPizzaQuantity[] = this.getCart();
      const mappedCart: Pizza[] = cart.map( ipq => new Pizza(ipq.pizza));
      console.log('old cart : ' + JSON.stringify(cart));
      let indexNewPQ = 0;
      let indexDoublePQ;
      let currentNewPQ: IPizzaQuantity;
      let doublePQ: IPizzaQuantity;
      let currentNewPizza: Pizza;
      while (indexNewPQ < addedIPizzaQuantities.length) {
        currentNewPQ = addedIPizzaQuantities[indexNewPQ];
        currentNewPizza = new Pizza(currentNewPQ.pizza);
        indexDoublePQ = indexOf(mappedCart, currentNewPizza);
        if (indexDoublePQ === -1) {
          // nouvelle pizza
          console.log(JSON.stringify(currentNewPizza) + ' is new');
          cart.push(currentNewPQ);
        } else {
          doublePQ = cart[indexDoublePQ];
          console.log(JSON.stringify(currentNewPizza) + ' is already there !!!!! ');
          cart[indexDoublePQ] = {
            pizza: doublePQ.pizza,
            quantity: currentNewPQ.quantity + doublePQ.quantity
          };
        }
        indexNewPQ++;
      }
      this.setCart(cart);
      console.log('new cart : ' + JSON.stringify(cart));
      return cart;
    }
  }

}
