import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StandardPizzasComponent} from './standard-pizzas/standard-pizzas.component';
import {StandardPizzasResolverService} from './services/standard-pizzas-resolver.service';
import {PizzasFavoritesService} from '../services/pizzas-favorites.service';

const routes: Routes = [
  {path: 'standardPizzas', component: StandardPizzasComponent,
                               resolve: {pizzas: StandardPizzasResolverService}},
  {path: 'standardPizzas/:category', component: StandardPizzasComponent,
                               resolve: {pizzas: StandardPizzasResolverService}}
];
@NgModule({
  declarations: [
    StandardPizzasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ProductsModule {  }
