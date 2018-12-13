import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pizza} from '../models/Pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasFavoritesService {


  url = 'http://localhost:8082/martiastrid/api/pizzasFavorite';

  constructor(private http: HttpClient) { }

  getAllPizzasFavorites(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.url);
  }

  switchPizzaFavoriteness(idPizza: number): Observable<Pizza[]> {
    const updateUrl = `${this.url}/${idPizza}`;
    console.log(updateUrl);
    return this.http.get<Pizza[]>(updateUrl);
  }

}
