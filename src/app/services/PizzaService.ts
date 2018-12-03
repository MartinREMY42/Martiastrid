import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IPizza} from '../models/IPizza';

@Injectable({
  providedIn : 'root'
})
export class PizzaService {

  pizzaURL = 'http://localhost:8082/martiastrid/api/pizzas';

  constructor(private http: HttpClient) {
  }

  getAllPizzas(): Observable<IPizza[]> {
    return this.http.get<IPizza[]>(this.pizzaURL);
  }
}
