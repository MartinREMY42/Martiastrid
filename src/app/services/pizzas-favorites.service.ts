import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPizza} from '../models/IPizza';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PizzasFavoritesService {

  pizzasFavorites ;
  favorites: BehaviorSubject<IPizza[]> =
    new BehaviorSubject(JSON.parse(window.sessionStorage.getItem('pizzasFavorites')) || []);

  url = 'http://localhost:8082/martiastrid/api/pizzasFavorite';

  constructor(private http: HttpClient) { }

  getAllPizzasFavorites(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(this.url).pipe(
      tap((pizzas: IPizza[] ) => {
        console.log('ALL' + JSON.stringify(pizzas));
    })
    );
  }

 /* switchPizzaFavoriteness(idPizza: number): Observable<IPizza[]> {
    const updateUrl = `${this.url}/${idPizza}`;
    console.log(updateUrl);
    return this.http.get<IPizza[]>(updateUrl)();
  }*/
}
