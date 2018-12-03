import {Component, OnInit} from '@angular/core';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from '../../services/pizzaService';
import {ICategory} from '../../models/category';
import {CategoryService} from '../../services/categoryService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

  allPizzasMock: IPizza[] = [
    {
      'id': 1,
      'genericName': 'margherita',
      'price': 10,
      'ingredients': [
        {
          'id': 5,
          'genericName': 'mozzarella',
          'stockQuantity': 50,
          'priceForComposition': 5,
          'selected': false
        },
        {
          'id': 10,
          'genericName': 'tomate',
          'stockQuantity': 100,
          'priceForComposition': 10,
          'selected': false
        }
      ],
      'custom': false,
      'category': [
        'spicy'
      ]
    },
    {
      'id': 2,
      'genericName': 'regina',
      'price': 20,
      'ingredients': [
        {
          'id': 5,
          'genericName': 'mozzarella',
          'stockQuantity': 50,
          'priceForComposition': 5,
          'selected': false
        },
        {
          'id': 9,
          'genericName': 'jambon',
          'stockQuantity': 90,
          'priceForComposition': 9,
          'selected': false
        },
        {
          'id': 10,
          'genericName': 'tomate',
          'stockQuantity': 100,
          'priceForComposition': 10,
          'selected': false
        },
        {
          'id': 11,
          'genericName': 'champignon',
          'stockQuantity': 110,
          'priceForComposition': 11,
          'selected': false
        }
      ],
      'custom': false,
      'category': [
        'cannibale'
      ]
    },
    {
      'id': 3,
      'genericName': 'fourCheese',
      'price': 30,
      'ingredients': [
        {
          'id': 1,
          'genericName': 'emmental',
          'stockQuantity': 10,
          'priceForComposition': 1,
          'selected': false
        },
        {
          'id': 5,
          'genericName': 'mozzarella',
          'stockQuantity': 50,
          'priceForComposition': 5,
          'selected': false
        },
        {
          'id': 8,
          'genericName': 'bleu_d_auvergne',
          'stockQuantity': 80,
          'priceForComposition': 8,
          'selected': false
        },
        {
          'id': 10,
          'genericName': 'tomate',
          'stockQuantity': 100,
          'priceForComposition': 10,
          'selected': false
        },
        {
          'id': 12,
          'genericName': 'fromage_de_chevre',
          'stockQuantity': 120,
          'priceForComposition': 12,
          'selected': false
        }
      ],
      'custom': false,
      'category': [
        'special'
      ]
    },
    {
      'id': 4,
      'genericName': 'veggie',
      'price': 40,
      'ingredients': [
        {
          'id': 2,
          'genericName': 'poivron',
          'stockQuantity': 20,
          'priceForComposition': 2,
          'selected': false
        },
        {
          'id': 3,
          'genericName': 'oignons',
          'stockQuantity': 30,
          'priceForComposition': 3,
          'selected': false
        },
        {
          'id': 4,
          'genericName': 'olives',
          'stockQuantity': 40,
          'priceForComposition': 4,
          'selected': false
        },
        {
          'id': 7,
          'genericName': 'aubergines',
          'stockQuantity': 70,
          'priceForComposition': 7,
          'selected': false
        },
        {
          'id': 10,
          'genericName': 'tomate',
          'stockQuantity': 100,
          'priceForComposition': 10,
          'selected': false
        },
        {
          'id': 11,
          'genericName': 'champignon',
          'stockQuantity': 110,
          'priceForComposition': 11,
          'selected': false
        }
      ],
      'custom': false,
      'category': [
        'vegan'
      ]
    }
  ];

  allCategories: ICategory[];
  filteredPizzas: IPizza[];

  errorMessage;
  orderedPizzas: number[] = [null, 0, 0, 0, 0];

  constructor( private route: ActivatedRoute,
              private router: Router,
              private pizzaService: PizzaService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    /* this.pizzaService.getAllPizzas().subscribe(
      allPizzas => {
        // this.allPizzas = this.allPizzasMock;
        this.allPizzas = allPizzas;
      },
      error => {
        this.errorMessage = <any>error;
      }
    ); */

    this.route.data.subscribe(
      data => this.filteredPizzas = data['pizzas']
    );
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.allCategories = categories;
      },
      error1 => this.errorMessage = <any>error1
    );
  }

  addPizzas() {
    console.log('TODO'); // TODO
  }

}
