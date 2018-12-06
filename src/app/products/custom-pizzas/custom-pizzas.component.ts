import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/iingredient';
import {IngredientService} from '../services/ingredientService';

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

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.ingredientService.getAll()
      .subscribe( allIngredients => this.allIngredients = allIngredients);
  }

}
