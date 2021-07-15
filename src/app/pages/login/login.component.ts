import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;

  constructor() {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.minLength(8)),
      isDriver: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmitJ() {}
}
