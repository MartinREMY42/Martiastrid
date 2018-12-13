import {Injectable} from '@angular/core';
import {Pizza, PizzaComparable} from '../../models/Pizza';
import {AuthenticationService} from '../../services/authentication.service';
import {PizzaQuantity} from '../../models/PizzaQuantity';
import {indexOf} from '../../utils/list-util';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  api = 'http://localhost:8082/martiastrid/api/';
  removeUrl = this.api + 'cart/remove';
  getCartUrl = this.api + 'cart/getUserCart';
  incrementUrl = this.api + 'cart/increment';
  decrementUrl = this.api + 'cart/decrement';
  addToCartUrl = this.api + 'pizzas/addToCart';

  private cart: BehaviorSubject<PizzaQuantity[]> = new BehaviorSubject(this.getCart());
  cartObservable: Observable<PizzaQuantity[]> = this.cart.asObservable();

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {}

  private getCart(): PizzaQuantity[] {
    if (this.authenticationService.isLoggedIn()) {
      // l'utilisateur est connecté
      this.getCartFromApi().subscribe(iPizzaQuantities => this.setLocalCart(iPizzaQuantities));
    }
    const cart = JSON.parse(localStorage.getItem('pizzaCart'));
    return (cart == null) ? [] : cart;
  }

  private setLocalCart(cart: PizzaQuantity[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    this.cart.next(cart);
  }

  private addAllPizzaLocally(addedIPizzaQuantities: PizzaQuantity[]) {
    let cart: PizzaQuantity[] = this.getCart();
    const mappedCart: PizzaComparable[] = cart.map(ipq => new PizzaComparable(ipq.pizza));
    let indexNewPQ = 0;
    let indexDoublePQ; // l'index dans cart de l'eventuel pizza déjà dans le panier (à merger donc)
    let currentNewPQ: PizzaQuantity;
    let doublePQ: PizzaQuantity;
    let currentNewPizza: PizzaComparable;
    while (indexNewPQ < addedIPizzaQuantities.length) {
      currentNewPQ = addedIPizzaQuantities[indexNewPQ];
      currentNewPizza = new PizzaComparable(currentNewPQ.pizza);
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

  getCartFromApi(): Observable<PizzaQuantity[]> {
    return this.http.get<PizzaQuantity[]>(this.getCartUrl);
  }

  addToCart(addedIPizzaQuantities: PizzaQuantity[]) {
    if (this.authenticationService.isLoggedIn()) {
      // send the added pizza to the API
      // retrieve from that same method the merged cart
      // "persist it" in localStorage
      this.http.post<PizzaQuantity[]>(this.addToCartUrl, addedIPizzaQuantities).subscribe(cart => {
        this.setLocalCart(cart);
      });
    } else {
      this.addAllPizzaLocally(addedIPizzaQuantities);
    }
  }

  remove(pizza: Pizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<PizzaQuantity[]>(this.removeUrl, pizza).subscribe(cart => {
        console.log('removed cart : ' + JSON.stringify(cart));
        this.setLocalCart(cart);
      });
    } else {
      let cart: PizzaQuantity[] = this.getCart();
      const pizzifiedIPizza: PizzaComparable = new PizzaComparable(pizza);
      cart = cart.filter(ipq => {
        const pizzifiedIPQ: PizzaComparable = new PizzaComparable(ipq.pizza);
        return !pizzifiedIPizza.equals(pizzifiedIPQ);
      });
      this.setLocalCart(cart);
    }
  }

  increment(pizza: Pizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<PizzaQuantity[]>(this.incrementUrl, pizza).subscribe(cart => {
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

  decrement(pizza: Pizza) {
    if (this.authenticationService.isLoggedIn()) {
      this.http.post<PizzaQuantity[]>(this.decrementUrl, pizza).subscribe(cart => {
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
