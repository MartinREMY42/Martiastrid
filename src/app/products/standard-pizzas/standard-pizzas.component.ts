import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ICategory} from '../../models/category';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from '../services/pizzaService';
import {CategoryService} from '../services/categoryService';
import {CartService} from '../services/cartService';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-standard-pizzas',
  templateUrl: './standard-pizzas.component.html',
  styleUrls: ['./standard-pizzas.component.css']
})
export class StandardPizzasComponent implements OnInit {

  allCategories: ICategory[];
  filteredPizzas: IPizza[];

  errorMessage;
  orderedPizzas: number[] = [0, 0, 0, 0];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private login: AuthenticationService,
              private pizzaService: PizzaService,
              private categoryService: CategoryService,
              private cartService: CartService) {
  }

  ngOnInit() {

    this.categoryService.getAllCategories().subscribe(
      categories => this.allCategories = categories,
      error => this.errorMessage = <any>error);

    this.pizzaService.filterPizzasObservable.subscribe( iPizzas => this.onFilterUpdate(iPizzas));
  }

  onFilterUpdate(iPizzas: IPizza[]) {
    this.filteredPizzas = iPizzas;
    this.orderedPizzas = [];
    this.filteredPizzas.forEach(p => this.orderedPizzas.push(0));
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

  switchPizzaFavoriteness(idPizza: number) {
    this.pizzaService.switchPizzaFavoriteness(idPizza);
  }

  setFilter(filter: string) {
    this.pizzaService.setFilter(filter);
  }
}
