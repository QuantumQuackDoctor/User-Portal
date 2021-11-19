import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { createPasswordValidator } from 'src/app/validators/PasswordValidator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../shared.css'],
})
export class LoginFormComponent {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  loginError = false;
  errorMessage = '*email or password invalid';
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, createPasswordValidator()],
      }),
      isDriver: new FormControl(false),
    });
    this.route.queryParamMap.subscribe((map) => {
      this.returnUrl = map.get('returnUrl') || '/';
    });
  }

  onSubmit() {
    if (this.loginGroup.valid) {
      this.authService.login(this.loginGroup.value).subscribe(
        () => {
          this.loginError = false;
          this.router.navigate([this.returnUrl]);
        },
        (err: HttpErrorResponse) => {
          this.loginError = true;
          switch (err.status) {
            case 401:
            case 403:
              this.errorMessage = '*email or password invalid';
              break;
            default:
              this.errorMessage = 'failed to connect to server';
          }
        }
      );
    }
  }
}
