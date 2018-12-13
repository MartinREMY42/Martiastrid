import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StandardPizzasComponent} from './standard-pizzas/standard-pizzas.component';
import {CustomPizzasComponent} from './custom-pizzas/custom-pizzas.component';
import {FormsModule} from '@angular/forms';
import {CartComponent} from './cart/cart.component';
import { PartyComponent } from './party/party.component';

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
    path: 'customPizzas',
    component: CustomPizzasComponent
  },
  {
    path: 'partyPizzas',
    component: PartyComponent
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
    PartyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsModule {
}
