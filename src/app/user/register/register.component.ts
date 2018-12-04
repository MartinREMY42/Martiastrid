import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
      passwordconf: [null, Validators.compose([Validators.required, ])]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

}
