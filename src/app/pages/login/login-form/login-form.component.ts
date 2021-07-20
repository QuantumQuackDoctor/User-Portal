import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  loginError = false;
  errorMessage = '*email or password invalid';

  constructor(private authService: AuthService, private router: Router) {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8), Validators.required],
        updateOn: 'blur',
      }),
      isDriver: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginGroup.valid) {
      this.authService.login(this.loginGroup.value).subscribe(
        (res) => {
          this.loginError = false;
          this.router.navigate(['/home']);
        },
        (err) => {
          this.loginError = true;
          switch (err.status) {
            case 0:
              this.errorMessage = 'failed to connect to server';
              //TODO change invalid credentials message
              break;
            default:
              this.errorMessage = '*email or password invalid';
          }
        }
      );
    }
  }
}
