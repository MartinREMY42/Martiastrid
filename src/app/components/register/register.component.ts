import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../utils/must-match.validator';
import {CorrectDate} from '../../utils/correct-date.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username:     [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      birthday:     [null, Validators.compose([Validators.required])],
      password:     [null, Validators.compose([Validators.required, Validators.minLength(4)])],
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
    const d: Date = this.registerForm.controls.birthday.value;
    console.log(d + 'annif');
  }
}
