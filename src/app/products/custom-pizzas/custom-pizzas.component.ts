import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/Ingredient';
import {IngredientService} from '../services/ingredientService';
import {Pizza} from '../../models/Pizza';
import {CartService} from '../services/cartService';

@Component({
  selector: 'app-custom-pizzas',
  templateUrl: './custom-pizzas.component.html',
  styleUrls: ['./custom-pizzas.component.css']
})
export class CustomPizzasComponent implements OnInit {

  ingredientsQuantity: number[] = [null,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0];
  allIngredients: Ingredient[];
  orderedIngredients: number[];

  constructor(private ingredientService: IngredientService,
              private cartService: CartService) { }

  ngOnInit() {
    this.ingredientService.getAll()
      .subscribe( allIngredients => this.allIngredients = allIngredients);
  }

  makeCustom() {
    const ingredientQuantities: {ingredient: Ingredient; quantity: number }[] = [];
    let i = 0;
    let qttyIngredientI: number;
    let ingredientI: Ingredient;
    while (i < this.orderedIngredients.length) {
      qttyIngredientI = this.orderedIngredients[i];
      if (qttyIngredientI > 0) {
        ingredientI = this.allIngredients[i];
        ingredientQuantities.push({
          ingredient: ingredientI,
          quantity: qttyIngredientI
        });
      }
      i++;
    }
    this.cartService.addToCart([{pizza: pizzaCustom, quantity: quantity}]);
  }

}
