import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../shared.css'],
})
export class ForgotPasswordComponent {
  emailIcon = faEnvelope;
  hasSubmitted = false;
  emailSuccess = false;
  email: string = '';
  formGroup: FormGroup;
  errorMessage = '';
  resending = false;
  constructor(private authService: AuthService) {
    this.formGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
      }),
    });
  }

  onSubmit() {
    this.formGroup.updateValueAndValidity();
    if (!this.hasSubmitted && this.formGroup.valid) {
      this.hasSubmitted = true;
      this.authService.requestReset(this.formGroup.value.email).subscribe(
        () => {
          this.emailSuccess = true;
          this.email = this.formGroup.value.email;
        },
        (err: HttpErrorResponse) => {
          switch (err.status) {
            case 404:
              this.errorMessage = 'email does not exist';
              break;
            default:
              this.errorMessage = 'server error';
          }
          this.emailSuccess = false;
          this.hasSubmitted = false;
        }
      );
    }
  }

  resubmit() {
    if (
      this.emailSuccess == true &&
      this.hasSubmitted == true &&
      this.resending == false
    ) {
      this.resending = true;
      this.hasSubmitted = false;
      this.onSubmit();
      this.resending = false;
    }
  }
}
