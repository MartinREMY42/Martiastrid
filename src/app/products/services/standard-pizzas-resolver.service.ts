import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPizza} from '../../models/IPizza';
import {PizzaService} from './pizzaService';
import {PizzasFavoritesService} from '../../services/pizzas-favorites.service';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StandardPizzasResolverService implements Resolve<IPizza[]> {

  pizzas: Observable<IPizza[]>;
  favorites: BehaviorSubject<IPizza[]> =
    new BehaviorSubject(JSON.parse(window.sessionStorage.getItem('pizzasFavorites')) || []);

  constructor(private pizzaService: PizzaService,
              private pizzaFavoriteService: PizzasFavoritesService,
              private auth: AuthenticationService) { }

  public readonly cart: Observable<IPizza[]> = this.favorites.asObservable();

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
