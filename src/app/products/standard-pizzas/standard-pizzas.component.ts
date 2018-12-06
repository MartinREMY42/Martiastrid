import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../models/category';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from '../../services/pizzaService';
import {CategoryService} from '../../services/categoryService';
import {PizzasFavoritesService} from '../../services/pizzas-favorites.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

  allCategories: ICategory[];
  filteredPizzas: IPizza[];
  pizzas: IPizza[] = [];

  errorMessage;
  orderedPizzas: number[] = [null, 0, 0, 0, 0];

  constructor( private route: ActivatedRoute,
              private router: Router,
              private login: AuthenticationService,
              private pizzaService: PizzaService,
              private categoryService: CategoryService,
               private  pizzasFavorites: PizzasFavoritesService) {
  }

  ngOnInit() {

    this.route.data.subscribe(
      data => this.filteredPizzas = data['pizzas']
    );
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.allCategories = categories;
      },
      error => this.errorMessage = <any>error
    );
  }

  isLoggingIn(): boolean {
    return this.login.isLoggedIn();
  }

  addPizzas() {
    console.log('TODO'); // TODO
  }

}
