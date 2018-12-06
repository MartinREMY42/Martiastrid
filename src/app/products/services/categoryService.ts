import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategory} from '../../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8082/martiastrid/api/categories';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url);
  }
}
