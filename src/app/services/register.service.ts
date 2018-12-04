import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  url_registration = 'http://localhost:8082/martiastrid/api/registerUser'

  register(user: IUser) {
    this.http.post(this.url_registration, user);
  }
}
