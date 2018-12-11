import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StandardPizzasComponent} from './standard-pizzas/standard-pizzas.component';
import {CustomPizzasComponent} from './custom-pizzas/custom-pizzas.component';
import {FormsModule} from '@angular/forms';
import {PizzaFavoriteSwitchComponent} from './pizza-favorite-switch/pizza-favorite-switch.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {
    path: 'standardPizzas',
    component: StandardPizzasComponent
  },
  {
    path: 'standardPizzas/:category',
    component: StandardPizzasComponent
  },
  {
    path: 'addPizzaFavorite/:idPizza',
    component: PizzaFavoriteSwitchComponent
  },
  {
    path: 'customPizzas',
    component: CustomPizzasComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  declarations: [
    StandardPizzasComponent,
    CustomPizzasComponent,
    CartComponent,
    PizzaFavoriteSwitchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsModule {
}
