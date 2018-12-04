import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenubarModule, ButtonModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './home/welcome.component';
import {LoginComponent} from './components/login/login.component';
import {PayComponent} from './components/pay/pay.component';
import {StandardPizzasComponent} from './components/standard-pizzas/standard-pizzas.component';
import {SuccessPaymentComponent} from './components/success-payment/success-payment.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {CartComponent} from './components/cart/cart.component';
import {ErrorComponent} from './components/error/error.component';
import {CancelPaymentComponent} from './components/cancel-payment/cancel-payment.component';
import {CustomPizzasComponent} from './components/custom-pizzas/custom-pizzas.component';

import {StandardPizzasResolverService} from './components/standard-pizzas/standard-pizzas-resolver.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Route[] = [
  {path: 'standardPizzas', component: StandardPizzasComponent,
                                  resolve: {pizzas: StandardPizzasResolverService}},
  {path: 'standardPizzas/:category', component: StandardPizzasComponent,
                                  resolve: {pizzas: StandardPizzasResolverService}},
  {path: 'welcome' , component: WelcomeComponent},
  {path: '' , redirectTo: 'welcome', pathMatch: 'full'},


];

@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    CancelPaymentComponent,
    CartComponent,
    CustomPizzasComponent,
    ErrorComponent,
    LoginComponent,
    PayComponent,
    StandardPizzasComponent,
    SuccessPaymentComponent,
    WelcomeComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
