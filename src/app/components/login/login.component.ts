import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  password: string;
  username: string;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  ngOnInit() {
  }

  authenticateTheUser() {
    console.log('not implemented'); // TODO implémenter
  }
}
