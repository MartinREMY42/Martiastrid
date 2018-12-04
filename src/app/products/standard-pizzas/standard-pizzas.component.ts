import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../models/category';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from '../../services/pizzaService';
import {CategoryService} from '../../services/categoryService';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

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
