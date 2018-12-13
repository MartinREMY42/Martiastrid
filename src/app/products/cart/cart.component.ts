import {Component, OnInit} from '@angular/core';
import {PizzaQuantity} from '../../models/PizzaQuantity';
import {CartService} from '../services/cartService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: PizzaQuantity[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartObservable.subscribe( iPizzaQuantities =>
      this.onCartUpdate(iPizzaQuantities));
  }

  onCartUpdate(iPizzaQuantities: PizzaQuantity[]) {
    this.cart = iPizzaQuantities;
  }

  increment(indexPizza: number) {
    this.cartService.increment(this.cart[indexPizza].pizza);
  }

  decrement(indexPizza: number) {
    this.cartService.decrement(this.cart[indexPizza].pizza);
  }

  remove(indexPizza: number) {
    this.cartService.remove(this.cart[indexPizza].pizza);
  }

}
