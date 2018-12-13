import {Injectable} from '@angular/core';
import {RecipesQuantity} from '../../models/RecipesQuantity';
import {HttpClient} from '@angular/common/http';
import {PizzaQuantity} from '../../models/PizzaQuantity';
import {CartService} from './cartService';

@Injectable({
  providedIn: 'root'
})
export class PizzaPartyService {
  api = 'http://localhost:8082/martiastrid/api/';
  makePizzaPartyURL = this.api + 'pizzaParty/make';

  constructor(private http: HttpClient, private cartService: CartService) {}

  addToCart(recipeQuantities: RecipesQuantity) {
    this.http.post<PizzaQuantity>(this.makePizzaPartyURL, recipeQuantities).subscribe(
      createdPizzaParty => this.cartService.addToCart([createdPizzaParty]));
  }
}
