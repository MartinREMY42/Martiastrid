import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';

import {AppComponent} from './app.component';
import {PayComponent} from './components/pay/pay.component';
import {SuccessPaymentComponent} from './components/success-payment/success-payment.component';
import {AccessDeniedComponent} from './components/access-denied/access-denied.component';
import {ErrorComponent} from './components/error/error.component';
import {CancelPaymentComponent} from './components/cancel-payment/cancel-payment.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {ProductsModule} from './products/products.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {UserModule} from './user/user.module';
import {MyJwtInterceptorService} from './interceptors/my-jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    CancelPaymentComponent,
    ErrorComponent,
    PayComponent,
    SuccessPaymentComponent,
    NavBarComponent,
    WelcomeComponent
  ],
  imports: [
    ProductsModule,
    UserModule,
    RouterModule.forRoot([
      {
        path: 'welcome',
        component: WelcomeComponent},
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'},
    ]),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    ButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyJwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
