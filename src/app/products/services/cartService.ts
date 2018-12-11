import {Injectable} from '@angular/core';
import {IPizza, Pizza} from '../../models/IPizza';
import {AuthenticationService} from '../../services/authentication.service';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api = 'http://localhost:8082/martiastrid/api/';
  getCartUrl = this.api + 'cart/getUserCart';
  addToCartUrl = this.api + 'pizzas/addToCart';
  incrementUrl = this.api + 'cart/increment';
  decrementUrl = this.api + 'cart/decrement';
  removeUrl = this.api + 'cart/remove';

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
  }

  getLocalCart(): IPizzaQuantity[] {
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  setLocalCart(cart: IPizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
  }

  getCartFromApi(): Observable<IPizzaQuantity[]> {
    return this.http.get<IPizzaQuantity[]>(this.getCartUrl);
  }

  addToCart(addedIPizzaQuantities: IPizzaQuantity[]) {
    if (this.authenticationService.isLoggedIn()) {
      // send the added pizza to the API
      // retrieve from that same method the merged cart
      // "persist it" in localStorage
      this.http.post<IPizzaQuantity[]>(this.addToCartUrl, addedIPizzaQuantities).subscribe(cart => {
        this.setLocalCart(cart);
      });
    } else {
      this.addAllPizzaLocally(addedIPizzaQuantities);
    }
  }

  private addAllPizzaLocally(addedIPizzaQuantities: IPizzaQuantity[]) {
    const cart: IPizzaQuantity[] = this.getLocalCart();
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
      if (indexDoublePQ === -1) { // nouvelle pizza
        cart.push(currentNewPQ);
      } else {
        doublePQ = cart[indexDoublePQ];
        cart[indexDoublePQ] = {
          pizza: doublePQ.pizza,
          quantity: currentNewPQ.quantity + doublePQ.quantity
        };
      }
      indexNewPQ++;
    }
    this.setLocalCart(cart);
  }

  remove(pizza: IPizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<IPizzaQuantity[]>(this.removeUrl, pizza).subscribe(cart => {
        this.setLocalCart(cart);
      });
    } else {
      let cart: IPizzaQuantity[] = this.getLocalCart();
      const pizzifiedIPizza: Pizza = new Pizza(pizza);
      cart = cart.filter( ipq => {
        const pizzifiedIPQ: Pizza = new Pizza(ipq.pizza);
        return !pizzifiedIPizza.equals(pizzifiedIPQ);
      });
      this.setLocalCart(cart);
    }
  }

  increment(pizza: IPizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<IPizzaQuantity[]>(this.incrementUrl, pizza).subscribe(cart => {
        this.setLocalCart(cart);
      });
    } else {
      this.addAllPizzaLocally([{
        pizza: pizza,
        quantity: 1
      }]);
    }
  }

  decrement(pizza: IPizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<IPizzaQuantity[]>(this.decrementUrl, pizza).subscribe(cart => {
        this.setLocalCart(cart);
      });
    } else {
      this.addAllPizzaLocally([{
        pizza: pizza,
        quantity: -1
      }]);
    }
  }
}
