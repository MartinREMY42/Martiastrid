import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import {PizzasFavoritesService} from './pizzas-favorites.service';
import {IPizza} from '../models/IPizza';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private pizzasFavoritesService: PizzasFavoritesService) { }
  url_authentication = 'http://localhost:8082/martiastrid/api/token/generate-token';

  login(username: string, password: string) {
    return this.http.post<any>(this.url_authentication, { username: username, password: password })
      .pipe(map((res: any) => {
        // login successful if there's a jwt token in the response
        if (res && res.token) {
          sessionStorage.setItem('currentUser', JSON.stringify({
            token: res.token
          }));
          sessionStorage.setItem('username',  username);
        }
      }));
  }
  // commitons avec mon nom
  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('username');

  }

  isLoggedIn(): boolean {
    return ( sessionStorage.getItem('currentUser')) ? true : false;
  }

  getJwtSubjet(): string {
    const stored = sessionStorage.getItem('currentUser');
    if (stored) {
      const helper = new JwtHelperService();
      return helper.decodeToken(JSON.parse(stored).token).sub;
    }
    return null;
  }
}
