import {Ingredient, IngredientComparable} from './Ingredient';
export interface Recipe {
  id: number;
  ingredient: Ingredient;
  quantity: number;
}

export class RecipeComparable {
  id: number;
  ingredient: IngredientComparable;
  quantity: number;

  constructor (recipe: Recipe) {
    this.id = recipe.id;
    this.ingredient = new IngredientComparable(recipe.ingredient);
    this.quantity = recipe.quantity;
  }

  equals(other: RecipeComparable) {
    if (this.quantity !== other.quantity) {
      return false;
    }
    return this.ingredient.equals(other.ingredient);
  }
}
