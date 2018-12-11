import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPizza} from '../../models/IPizza';
import {IPizzaQuantity} from '../../models/IPizzaQuantity';
import {indexOf} from '../../utils/list-util';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  pizzaURL = 'http://localhost:8082/martiastrid/api/pizzas';

  private allPizzas: IPizza[] = [];
  private filteredPizzas: BehaviorSubject<IPizza[]> = new BehaviorSubject([]);
  filterPizzasObservable: Observable<IPizza[]> = this.filteredPizzas.asObservable();

  constructor(private http: HttpClient) {
    this.getAllPizzas().subscribe( pizzas => {
      this.allPizzas = pizzas;
      console.log('toutes les pizzaname et pizzacategory ' + JSON.stringify(pizzas.map( iPizza => {
        return {'p' : iPizza.genericName, 'c' : iPizza.category};
      })));
      this.setFilter('');
    });
  }

  private getAllPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(this.pizzaURL);
  }

  setFilter(filter: string) {
    if (filter === '') {
      this.filteredPizzas.next(this.allPizzas);
    } else if (filter === 'favorite') {
      this.filteredPizzas.next(this.allPizzas); // fuck you i'll do it later
    } else {
      // category filter
      const categorisedPizza: IPizza[] = this.getCategorisedPizza(filter);
      this.filteredPizzas.next(categorisedPizza);
    }
  }

  private getCategorisedPizza(category: string) {
    const categorisedPizza: IPizza[] = this.allPizzas
      .filter( iPizza => iPizza.category.includes(category));
    return categorisedPizza;
  }

}
