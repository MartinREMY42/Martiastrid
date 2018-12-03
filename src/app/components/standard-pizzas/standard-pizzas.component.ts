import {Component, OnInit} from '@angular/core';
import {IPizza} from '../../models/IPizza';
import {HttpClient} from '@angular/common/http';
import {PizzaService} from '../../services/PizzaService';
import {ICategory} from '../../models/category';
import {CategoryService} from '../../services/categoryService';
import {ActivatedRoute, Router} from '@angular/router';

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
