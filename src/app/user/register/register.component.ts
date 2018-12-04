import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import {MustMatch} from '../../utils/must-match.validator';
import {CorrectDate} from '../../utils/correct-date.validator';
import {RegisterService} from '../../services/register.service';
import {first} from 'rxjs/operators';
import {IUser} from '../../models/IUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private registerService: RegisterService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      birthday: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      passwordconf: [null, Validators.required]
    }, {
      validator: [
        MustMatch('password', 'passwordconf'),
        CorrectDate('birthday')]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const date_string: string = JSON.stringify(this.registerForm.get('birthday').value);
    console.log(date_string + ' stringified json');
    const date_date: Date = new Date(date_string);
    console.log(date_date + ' date');
    const user: IUser = {
      username: <string>this.registerForm.get('username').value,
      password: <string>this.registerForm.get('password').value,
      enabled: true,
      nonExpired: true,
      nonLocked: true,
      credentialsNonExpired: true,
      authorities: [{authority: 'ROLE_USER'}],
      birthDate: date_date,
      creationDate: new Date(),
      orders: []
    };
    this.registerService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          console.log('go to standard pizzas');
          this.router.navigate(['/standardPizzas']);
        });
    console.log('after the registration');

  }
}
