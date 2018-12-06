import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPizza} from '../models/IPizza';

@Injectable({
  providedIn: 'root'
})
export class PizzasFavoritesService {

  //
  url = 'http://localhost:8082/martiastrid/api/pizzasFavorite';

  constructor(private http: HttpClient) { }

  getAllPizzasFavorites(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(this.url);
  }
}
