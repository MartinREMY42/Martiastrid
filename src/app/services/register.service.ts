import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  url_registration = 'http://localhost:8082/martiastrid/api/registerUser'

  register(user: User) {
    console.log('service about to register to the api side');
    return this.http.post(this.url_registration, user)
      .pipe(map(project => {
        console.log('project : ' + project);
        }, thisArg => {
        console.log('thisArg : ' + thisArg);
      }));
  }
}
