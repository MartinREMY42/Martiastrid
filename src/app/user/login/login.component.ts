import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PizzaService} from '../../products/services/pizzaService';
import {CartService} from '../../products/services/cartService';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage: string;
  returnURL: string;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private pizzaService: PizzaService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  authenticateTheUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value)
      .pipe(first())
      .subscribe(
        data => {
          this.pizzaService.chargeFavoritePizzas();
          this.cartService.onConnection();
          this.router.navigate(['/standardPizzas']);
        },
        error => this.errorMessage = JSON.stringify(error));
  }

}
