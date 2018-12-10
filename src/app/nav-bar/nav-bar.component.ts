import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];
  userName: string;

  constructor(private _auth: AuthenticationService) {
    if (this._auth.isLoggedIn()) {
      this.userName = sessionStorage.getItem('username');
    }
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/welcome'
      },
      {
        label: 'Pizzas',
        routerLink: '/standardPizzas'
      },
      {
        label: 'Custom Pizzas',
        routerLink: '/customPizzas'
      }
    ];

  }

  isLoggedIn(): boolean {
    return this._auth.isLoggedIn();
  }

  getJwtSubjet(): string {
    return this._auth.getJwtSubjet();
  }

}
