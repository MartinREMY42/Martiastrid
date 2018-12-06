import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  items: MenuItem[];

  constructor() { }

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

}
