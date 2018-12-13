import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = 'http://localhost:8082/martiastrid/api/ingredients/all';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }

  getExceptPattes(): Observable<Ingredient[]> {
    return this .http.get<Ingredient[]>('http://localhost:8082/martiastrid/api/ingredients/exceptPatte');
  }
}
