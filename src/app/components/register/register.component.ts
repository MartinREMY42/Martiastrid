import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import {MustMatch} from '../../utils/must-match.validator';
import {CorrectDate} from '../../utils/correct-date.validator';
import {RegisterService} from '../../services/register.service';
import {first} from 'rxjs/operators';
import {IUser} from '../../models/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
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
    const user: IUser = {
      username: <string>this.registerForm.get('username').value,
      password: <string>this.registerForm.get('password').value,
      enabled: true,
      nonExpired: true,
      nonLocked: true,
      credentialsNonExpired: true,
      authorities: [{authority: 'ROLE_USER'}],
      birthDate: <Date>this.registerForm.get('birthDate'),
      creationDate: <Date>Date.now(),
      orders: []
    };
    this.registerService.register(user);

  }
}
