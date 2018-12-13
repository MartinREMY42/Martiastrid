import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pizza} from '../../models/Pizza';
import {PizzaQuantity} from '../../models/PizzaQuantity';
import {indexOf} from '../../utils/list-util';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  api = 'http://localhost:8082/martiastrid/api/';
  pizzaURL = this.api + 'pizzas';
  pizzaFavoritenessUrl = this.api + 'pizzasFavorite';

  private allPizzas: Pizza[] = [];
  private currentFilter = '';
  private filteredPizzas: BehaviorSubject<Pizza[]> = new BehaviorSubject([]);
  filterPizzasObservable: Observable<Pizza[]> = this.filteredPizzas.asObservable();

  constructor(private authenticationService: AuthenticationService,
              private http: HttpClient) {
    this.chargeFavoritePizzas();
  }

  chargeFavoritePizzas() {
    this.getAllPizzas().subscribe( pizzas => {
      this.allPizzas = pizzas;
      if (this.authenticationService.isLoggedIn()) {
        this.getAllFavoritesPizzas().subscribe(favoritePizzas =>
          this.updateLocallyFavoritePizzas(favoritePizzas));
      } else {
        this.updateLocallyFavoritePizzas([]);
      }
      this.setFilter('');
    });
  }

  private getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.pizzaURL);
  }

  updateLocallyFavoritePizzas(favoritePizzas: Pizza[]) {
    const favoritePizzasId = favoritePizzas.map(ipizza => ipizza.id);
    console.log('those are the favorite : ' + JSON.stringify(favoritePizzasId));
    console.log('update locally pizza favoritness of ' + JSON.stringify(this.allPizzas.map( ipizza => {
      return {'p' : ipizza.genericName, 'f': ipizza.favorite};
    })));
    for (const pizza of this.allPizzas) {
      pizza.favorite = (favoritePizzasId.includes(pizza.id));
    }
    console.log('updated : ' + JSON.stringify(this.allPizzas.map( ipizza => {
      return {'p' : ipizza.genericName, 'f': ipizza.favorite};
    })));
    this.setFilter(this.currentFilter); // nécessaire pour mettre au courant les abonnés
  }

  private getAllFavoritesPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.pizzaFavoritenessUrl);
  }

  switchPizzaFavoriteness(idPizza: number) {
    if (this.authenticationService.isLoggedIn()) {
      const updateUrl = `${this.pizzaFavoritenessUrl}/${idPizza}`;
      console.log(updateUrl);
      return this.http.get<Pizza[]>(updateUrl).subscribe(iPizzas =>
        this.updateLocallyFavoritePizzas(iPizzas));
    }
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    if (filter === '') {
      this.filteredPizzas.next(this.allPizzas);
    } else if (filter === 'favorite') {
      const favoritePizza: Pizza[] = this.getFavoritesPizzas();
      this.filteredPizzas.next(favoritePizza);
    } else {
      // category filter
      const categorisedPizza: Pizza[] = this.getCategorisedPizza(filter);
      this.filteredPizzas.next(categorisedPizza);
    }
  }

  getFavoritesPizzas(): Pizza[] {
    if (this.authenticationService.isLoggedIn()) {
      return this.allPizzas.filter(iPizza => iPizza.favorite);
    }
  }

  private getCategorisedPizza(category: string) {
    return this.allPizzas.filter( iPizza => iPizza.category.includes(category));
  }

}
