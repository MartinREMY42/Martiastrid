import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from './pizzaService';
import {PizzasFavoritesService} from '../../services/pizzas-favorites.service';

@Injectable({
  providedIn: 'root'
})
export class StandardPizzasResolverService implements Resolve<IPizza[]> {

  constructor(private pizzaService: PizzaService,
              private pizzaFavoriteService: PizzasFavoritesService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
                   Observable<IPizza[]>  {

    const category: string = route.paramMap.get('category');
    if (category == null) {
      return this.pizzaService.getAllPizzas();
    }
    if (category === 'favorite') {
      return this.pizzaFavoriteService.getAllPizzasFavorites();
    }
    return this.pizzaService.getPizzasByCategory(category);
  }
}
