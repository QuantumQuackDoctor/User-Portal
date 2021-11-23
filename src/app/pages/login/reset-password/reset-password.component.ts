import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { createPasswordValidator } from 'src/app/validators/PasswordValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../shared.css'],
})
export class ResetPasswordComponent {
  formGroup: FormGroup;
  errorMessage = '';
  hasSubmitted = false;

  passwordValidator: ValidatorFn = (fg: FormGroup) => {
    const password1 = fg.get('password').value;
    const password2 = fg.get('parityPassword').value;

    return password1 === password2
      ? null
      : { differentPasswords: { value: password2 } };
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = new FormGroup(
      {
        password: new FormControl(null, {
          validators: [createPasswordValidator(), Validators.required],
        }),
        parityPassword: new FormControl(null, {
          validators: [Validators.required],
        }),
      },
      this.passwordValidator
    );
  }

  onSubmit() {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      this.errorMessage = '';
      this.hasSubmitted = true;
      let data = {
        newPassword: this.formGroup.value.password,
        token: this.route.snapshot.params.token,
      };
      this.authService.resetPassword(data).subscribe(
        () => {
          this.router.navigate(['/account/login']);
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 410:
              this.errorMessage = '*password reset expired';
              break;
            case 404:
              this.errorMessage = '*password reset token does not exist';
              break;
            case 500:
              this.errorMessage = '*server error';
          }
          this.hasSubmitted = false;
        }
      );
    } else {
      if (this.formGroup.errors.differentPasswords !== null) {
        this.errorMessage = '*Passwords must match';
      }
    }
  }
}
