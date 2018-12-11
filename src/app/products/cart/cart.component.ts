import {Component, OnInit} from '@angular/core';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {CartService} from '../services/cartService';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: IPizzaQuantity[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.cartObservable.subscribe( iPizzaQuantities =>
      this.onCartUpdate(iPizzaQuantities));
  }

  onCartUpdate(iPizzaQuantities: IPizzaQuantity[]) {
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
