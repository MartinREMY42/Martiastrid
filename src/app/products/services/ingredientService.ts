import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ingredient} from '../../models/Ingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  url = 'http://localhost:8082/martiastrid/api/ingredients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.url);
  }
}
