import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../models/Category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8082/martiastrid/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }
}
