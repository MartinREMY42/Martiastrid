import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PizzasFavoritesService} from '../../services/pizzas-favorites.service';

@Component({
  selector: 'app-pizza-favorite-switch',
  templateUrl: './pizza-favorite-switch.component.html',
  styleUrls: ['./pizza-favorite-switch.component.css']
})
export class PizzaFavoriteSwitchComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              private route: Router,
              private pizzaFavorite: PizzasFavoritesService) { }

  ngOnInit() {
    const idPizza = +this.router.snapshot.paramMap.get('idPizza');
    console.log(JSON.stringify(idPizza));
    this.pizzaFavorite.switchPizzaFavoriteness(idPizza);
    this.route.navigate(['/standardPizzas']);
  }

}
