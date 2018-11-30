import {Component, OnInit} from '@angular/core';
import {IPizza} from '../../models/IPizza';
import {HttpClient} from '@angular/common/http';
import {PizzaService} from '../../services/PizzaService';
import {IIngredient} from '../../models/iingredient';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

  allPizzasMock:   IPizza[] = [
    <IPizza>{
      'id':   1,
      'genericName':  'margherita',
      'price':  10,
      'ingredients':
        [
          <IIngredient>{'id':  5, 'genericName':  'mozzarella', 'stockQuantity':  50, 'priceForComposition':  5, 'selected':  false},
          <IIngredient>{'id':  10, 'genericName':  'tomate', 'stockQuantity':  100, 'priceForComposition':  10, 'selected':  false}],
      'custom':  false,
      'category':  ['spicy']},
    <IPizza>{'id':   2,
      'genericName':   'regina',
      'price':  20,
      'ingredients':  [{'id':  5, 'genericName':  'mozzarella', 'stockQuantity':  50, 'priceForComposition':  5, 'selected':  false},
        <IIngredient>{'id':  9, 'genericName':  'jambon', 'stockQuantity':  90, 'priceForComposition':  9, 'selected':  false},
        <IIngredient>{'id':  10, 'genericName':  'tomate', 'stockQuantity':  100, 'priceForComposition':  10, 'selected':  false},
        <IIngredient>{'id':  11, 'genericName':  'champignon', 'stockQuantity':  110, 'priceForComposition':  11, 'selected':  false}],
      'custom':  false,
      'category':  []},
    <IPizza>{'id':   3,
      'genericName':   'fourCheese',
      'price':  30,
      'ingredients':  [{'id':  1, 'genericName':  'emmental', 'stockQuantity':  10, 'priceForComposition':  1, 'selected':  false},
        <IIngredient>{'id':  5, 'genericName':  'mozzarella', 'stockQuantity':  50, 'priceForComposition':  5, 'selected':  false},
        <IIngredient>{'id':  8, 'genericName':  'bleu_d_auvergne', 'stockQuantity':  80, 'priceForComposition':  8, 'selected':  false},
        <IIngredient>{'id':  10, 'genericName':  'tomate', 'stockQuantity':  100, 'priceForComposition':  10, 'selected':  false},
        <IIngredient>{'id':  12, 'genericName':  'fromage_de_chevre', 'stockQuantity':  120, 'priceForComposition':  12, 'selected':  false}],
      'custom':  false, 'category':  ['special']},
    <IPizza>{'id':   4,
      'genericName':   'veggie',
      'price':  40,
      'ingredients':  [{'id':  2, 'genericName':  'poivron', 'stockQuantity':  20, 'priceForComposition':  2, 'selected':  false},
        <IIngredient>{'id':  3, 'genericName':  'oignons', 'stockQuantity':  30, 'priceForComposition':  3, 'selected':  false},
        <IIngredient>{'id':  4, 'genericName':  'olives', 'stockQuantity':  40, 'priceForComposition':  4, 'selected':  false},
        <IIngredient>{'id':  7, 'genericName':  'aubergines', 'stockQuantity':  70, 'priceForComposition':  7, 'selected':  false},
        <IIngredient>{'id':  10, 'genericName':  'tomate', 'stockQuantity':  100, 'priceForComposition':  10, 'selected':  false},
        <IIngredient>{'id':  11, 'genericName':  'champignon', 'stockQuantity':  110, 'priceForComposition':  11, 'selected':  false}],
      'custom':  false,
      'category':  ['vegan']}];

  allPizzas: IPizza[] = this.allPizzasMock;

  errorMessage;
  orderedPizzas: number[] = [0, 0, 0, 0, 0];

  constructor(private http: HttpClient,
              private pizzaService: PizzaService) {
  }

  ngOnInit() {
    console.log(this.allPizzas);
    console.log(this.allPizzasMock);
    this.pizzaService.getAllPizzas().subscribe(
      allPizzas => this.allPizzas = this.allPizzasMock,
      error => this.errorMessage = <any>error
    );
  }

  updateOrderedPizzas() {
    console.log(this.orderedPizzas + ' is the order now');
  }

}
