import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StandardPizzasComponent} from './standard-pizzas/standard-pizzas.component';
import {StandardPizzasResolverService} from './services/standard-pizzas-resolver.service';
import {CustomPizzasComponent} from './custom-pizzas/custom-pizzas.component';
import {FormsModule} from '@angular/forms';
import { PizzaFavoriteSwitchComponent } from './pizza-favorite-switch/pizza-favorite-switch.component';
const routes: Routes = [
  {
    path: 'standardPizzas',
    component: StandardPizzasComponent,
    resolve: {pizzas: StandardPizzasResolverService}
  },
  {
    path: 'standardPizzas/:category',
    component: StandardPizzasComponent,
    resolve: {pizzas: StandardPizzasResolverService}
  },
  {
    path: 'addPizzaFavorite/:idPizza',
    component: PizzaFavoriteSwitchComponent
  },
  {
    path: 'customPizzas',
    component: CustomPizzasComponent
  }
];

@NgModule({
  declarations: [
    StandardPizzasComponent,
    CustomPizzasComponent,
    PizzaFavoriteSwitchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsModule {  }
