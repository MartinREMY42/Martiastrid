import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/Ingredient';
import {IngredientService} from '../services/ingredientService';
import {CustomPizzaService} from '../services/CustomPizzaService';
import {Recipe} from '../../models/Recipe';
import {RecipesQuantity} from '../../models/RecipesQuantity';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  allIngredients: Ingredient[];
  orderedIngredients: number[];
  quantityWanted = 1;

  constructor(private ingredientService: IngredientService,
              private customPizzaService: CustomPizzaService) { }

  ngOnInit() {
    this.ingredientService.getAll()
      .subscribe( allIngredients => {
        this.allIngredients = allIngredients;
        this.orderedIngredients = [];
        this.allIngredients.forEach(p => this.orderedIngredients.push(0));
      });
  }

  makeParty() {
    const recipes: Recipe[] = [];
    let i = 0;
    let qttyIngredientI: number;
    let ingredientI: Ingredient;
    while (i < this.orderedIngredients.length) {
      qttyIngredientI = this.orderedIngredients[i];
      if (qttyIngredientI > 0) {
        ingredientI = this.allIngredients[i];
        recipes.push({
          id: null,
          ingredient: ingredientI,
          quantity: qttyIngredientI
        });
      }
      i++;
    }
    const recipeQuantity: RecipesQuantity = {recipes: recipes, quantity: this.quantityWanted};
    this.customPizzaService.addToCart(recipeQuantity);
  }

}
