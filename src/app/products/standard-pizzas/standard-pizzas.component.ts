import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../models/category';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from '../services/pizzaService';
import {CategoryService} from '../services/categoryService';
import {CartService} from '../services/cartService';
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
  orderedPizzas: number[] = [0, 0, 0, 0];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private login: AuthenticationService,
              private pizzaService: PizzaService,
              private categoryService: CategoryService,
              private  pizzasFavorites: PizzasFavoritesService,
              private cartService: CartService) {
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
      error => this.errorMessage = <any>error
    );
  }

  isLoggingIn(): boolean {
    return this.login.isLoggedIn();
  }

  addPizzas() {
    const requestedPizzas: { pizza: IPizza; quantity: number }[] = [];
    let i = 0;
    let qttyPizzaI: number;
    let pizzaI: IPizza;
    while (i < this.orderedPizzas.length) {
      qttyPizzaI = this.orderedPizzas[i];
      if (qttyPizzaI > 0) {
        pizzaI = this.filteredPizzas[i];
        requestedPizzas.push({
          pizza: pizzaI,
          quantity: qttyPizzaI
        });
      }
      i++;
    }
    // console.log(JSON.stringify(requestedPizzas));
    /* this.pizzaService.addToCart(requestedPizzas).subscribe(
      confirmedCart => {
        console.log(confirmedCart);
        this.cartService.setCart(confirmedCart);
      });
      */
    this.cartService.addToCart(requestedPizzas);
  }

}
