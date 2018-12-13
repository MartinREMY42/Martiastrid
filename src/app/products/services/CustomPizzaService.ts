import {Injectable} from '@angular/core';
import {RecipesQuantity} from '../../models/RecipesQuantity';
import {HttpClient} from '@angular/common/http';
import {PizzaQuantity} from '../../models/PizzaQuantity';
import {CartService} from './cartService';

@Injectable({
  providedIn: 'root'
})
export class CustomPizzaService {
  api = 'http://localhost:8082/martiastrid/api/';
  makeCustomPizzaURL = this.api + 'customPizza/make';

  constructor(private http: HttpClient, private cartService: CartService) {}

  addToCart(recipeQuantities: RecipesQuantity) {
    this.http.post<PizzaQuantity>(this.makeCustomPizzaURL, recipeQuantities).subscribe(
      createdPizzaCustom => this.cartService.addToCart([createdPizzaCustom]));
  }
}
