import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StandardPizzasComponent} from './standard-pizzas/standard-pizzas.component';
import {StandardPizzasResolverService} from './services/standard-pizzas-resolver.service';
import {CustomPizzasComponent} from './custom-pizzas/custom-pizzas.component';
import {FormsModule} from '@angular/forms';

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
    path: 'customPizzas',
    component: CustomPizzasComponent
  }
];

@NgModule({
  declarations: [
    StandardPizzasComponent,
    CustomPizzasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ProductsModule {
}
