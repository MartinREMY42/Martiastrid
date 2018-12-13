export interface Ingredient {
  id: number;
  genericName: string;
  stockQuantity: number;
  priceForComposition: number;
  selected: boolean;
}
export class IngredientComparable {
  id: number;
  genericName: string;
  stockQuantity: number;
  priceForComposition: number;
  selected: boolean;

    constructor(ingredient: Ingredient) {
    this.id = ingredient.id;
    this.genericName = ingredient.genericName;
    this.stockQuantity = ingredient.stockQuantity;
    this.priceForComposition = ingredient.priceForComposition;
    this.selected = ingredient.selected;
  }

  equals(other: IngredientComparable) {
    return this.id === other.id;
  }

}
