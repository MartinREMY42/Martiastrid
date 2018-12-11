import {Injectable} from '@angular/core';
import {IPizza, Pizza} from '../../models/IPizza';
import {AuthenticationService} from '../../services/authentication.service';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

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

  private cart: BehaviorSubject<IPizzaQuantity[]> = new BehaviorSubject(this.getCart());
  cartObservable: Observable<IPizzaQuantity[]> = this.cart.asObservable();

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
  }

  private getCart(): IPizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      // l'utilisateur est connecté
      this.getCartFromApi().subscribe(ipqs => this.setLocalCart(ipqs));
    }
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  private setLocalCart(cart: IPizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    this.cart.next(cart);
  }

  private addAllPizzaLocally(addedIPizzaQuantities: IPizzaQuantity[]) {
    let cart: IPizzaQuantity[] = this.getCart();
    const mappedCart: Pizza[] = cart.map(ipq => new Pizza(ipq.pizza));
    let indexNewPQ = 0;
    let indexDoublePQ; // l'index dans cart de l'eventuel pizza déjà dans le panier (à merger donc)
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
        const newQuantity = currentNewPQ.quantity + doublePQ.quantity;
        if (newQuantity > 0) {
          cart[indexDoublePQ] = {
            pizza: doublePQ.pizza,
            quantity: newQuantity
          };
        } else {
          cart = cart.slice(indexDoublePQ, 1);
        }
      }
      indexNewPQ++;
    }
    this.setLocalCart(cart);
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

  remove(pizza: IPizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<IPizzaQuantity[]>(this.removeUrl, pizza).subscribe(cart => {
        console.log('removed cart : ' + JSON.stringify(cart));
        this.setLocalCart(cart);
      });
    } else {
      let cart: IPizzaQuantity[] = this.getCart();
      const pizzifiedIPizza: Pizza = new Pizza(pizza);
      cart = cart.filter(ipq => {
        const pizzifiedIPQ: Pizza = new Pizza(ipq.pizza);
        return !pizzifiedIPizza.equals(pizzifiedIPQ);
      });
      this.setLocalCart(cart);
    }
  }

  increment(pizza: IPizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<IPizzaQuantity[]>(this.incrementUrl, pizza).subscribe(cart => {
        console.log('incremented cart : ' + JSON.stringify(cart));
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
        console.log('decremented cart : ' + JSON.stringify(cart));
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
