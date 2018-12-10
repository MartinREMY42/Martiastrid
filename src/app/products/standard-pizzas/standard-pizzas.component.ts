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

  errorMessage;
  orderedPizzas: number[] = [0, 0, 0, 0];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private login: AuthenticationService,
              private pizzaService: PizzaService,
              private categoryService: CategoryService,
              private  pizzasFavoritesService: PizzasFavoritesService,
              private cartService: CartService) {
  }

  ngOnInit() {

    this.route.data.subscribe(
      data => {
        this.filteredPizzas = data['pizzas'];
        this.pizzasFavoritesService
          .getAllPizzasFavorites()
          .subscribe( favPizzas => {
            console.log('avant : ' + JSON.stringify(this.filteredPizzas));
            this.filteredPizzas = this.filteredPizzas.map((ipizza: IPizza) => {
              // si la pizza filtrée est contenu dans favPizzas
              const indexPizzaInFav = favPizzas.indexOf(ipizza);
              ipizza.favorite = (indexPizzaInFav > -1); // favorite si elle est contenue dans favPizzas
              return ipizza;
            });
            console.log('après : ' + JSON.stringify(this.filteredPizzas));
          });
    });
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

  switchPizzaFavoriteness(idPizza: number) {
    this.pizzasFavoritesService.switchPizzaFavoriteness(idPizza);
    // dont keep this when you merge
  }

}
