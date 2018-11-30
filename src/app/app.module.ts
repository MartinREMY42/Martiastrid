import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Route} from '@angular/router';

import {AppComponent} from './app.component';

import {LoginComponent} from './components/login/login.component';
import {PayComponent} from './components/pay/pay.component';
import {StandardPizzasComponent} from './components/standard-pizzas/standard-pizzas.component';
import {RegisterComponent} from './components/register/register.component';
import {SuccessPaymentComponent} from './components/success-payment/success-payment.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {CartComponent} from './components/cart/cart.component';
import {ErrorComponent} from './components/error/error.component';
import {CancelPaymentComponent} from './components/cancel-payment/cancel-payment.component';
import {CustomPizzasComponent} from './components/custom-pizzas/custom-pizzas.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

const routes: Route[] = [
  {path: 'standardPizzas', 'component': StandardPizzasComponent},
  {path: '', redirectTo: 'loginPage', pathMatch: 'full'},
  {path: '**', 'component': LoginComponent}
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
    RegisterComponent,
    StandardPizzasComponent,
    SuccessPaymentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
