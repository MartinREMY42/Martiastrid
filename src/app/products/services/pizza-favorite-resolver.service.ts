import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IPizza} from '../../models/IPizza';
import {Observable} from 'rxjs';
import {PizzasFavoritesService} from '../../services/pizzas-favorites.service';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class PizzaFavoriteResolverService implements  Resolve<IPizza[]> {

  constructor(private pizzaFavorite: PizzasFavoritesService,
              private auth: AuthenticationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                Observable<IPizza[]> {
    return this.auth.isLoggedIn() ? this.pizzaFavorite.getAllPizzasFavorites() : null;
  }
}
