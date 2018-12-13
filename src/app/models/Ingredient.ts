export class Ingredient {

  id: number;
  genericName: string;
  stockQuantity: number;
  priceForComposition: number;
  selected: boolean;

  constructor(id: number,
              genericName: string,
              stockQuantity: number,
              priceForComposition: number,
              selected: boolean) {
    this.id = id;
    this.genericName = genericName;
    this.stockQuantity = stockQuantity;
    this.priceForComposition = priceForComposition;
    this.selected = selected;
  }

  equals(other: Ingredient) {
    return this.id === other.id;
  }

}
