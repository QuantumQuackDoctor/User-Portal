import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../shared.css'],
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  passwordValidator: ValidatorFn = (fg: FormGroup) => {
    const password1 = fg.get('password').value;
    const password2 = fg.get('parityPassword').value;

    return password1 === password2
      ? null
      : { differentPasswords: { value: password2 } };
  };
  constructor(private route: ActivatedRoute) {
    this.formGroup = new FormGroup(
      {
        password: new FormControl(null, {
          validators: [Validators.min(8), Validators.required],
        }),
        parityPassword: new FormControl(null, {
          validators: [Validators.required],
        }),
      },
      this.passwordValidator
    );
  }

  ngOnInit(): void {
    console.log(this.route.params);
  }
}
