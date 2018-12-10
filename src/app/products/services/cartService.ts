import {Injectable} from '@angular/core';
import {Pizza} from '../../models/IPizza';
import {AuthenticationService} from '../../services/authentication.service';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  getCartUrl = 'http://localhost:8082/martiastrid/api/cart/getUserCart';
  addToCartUrl = 'http://localhost:8082/martiastrid/api/pizzas/addToCart';

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
  }

  getCart(): IPizzaQuantity[] {
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  setCart(cart: IPizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }

  getCartFromApi(): Observable<IPizzaQuantity[]> {
    return this.http.get<IPizzaQuantity[]>(this.getCartUrl);
  }

  addToCart(addedIPizzaQuantities: IPizzaQuantity[]): IPizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      this.http.get<IPizzaQuantity[]>(this.getCartUrl).subscribe(cart => {
        console.log('cart before merge in back :: ' + JSON.stringify(cart));
      });
      // send the added pizza to the API
      // retrieve from that same method the merged cart
      // "persist it" in localStorage
      this.http.post<IPizzaQuantity[]>(this.addToCartUrl, addedIPizzaQuantities).subscribe(cart => {
        this.setCart(cart);
        console.log('new cart merged in back-end : ' + JSON.stringify(cart));
      });
    } else {
      const cart: IPizzaQuantity[] = this.getCart();
      const mappedCart: Pizza[] = cart.map(ipq => new Pizza(ipq.pizza));
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
