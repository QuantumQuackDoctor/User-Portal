import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  badCredentials = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8)],
        updateOn: 'blur',
      }),
      isDriver: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginGroup.valid) {
      this.authService
        .authenticate(this.loginGroup.value)
        .then((m) => {
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          console.log(err);
          this.badCredentials = true;
        });
    }
  }
}
