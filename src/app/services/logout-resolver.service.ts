import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutResolver implements Resolve<any> {

  constructor(private authenticationService: AuthenticationService) {}

  resolve() {
    if (sessionStorage.getItem('currentUser')) {
      this.authenticationService.logout();
    }
  }
}
