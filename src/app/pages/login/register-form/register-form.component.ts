import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  loginError = false;
  errorMessage = '*email or password invalid';

  constructor(private authService: AuthService, private router: Router) {
    this.registerGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8), Validators.required],
        updateOn: 'blur',
      }),
      firstName: new FormControl(null, {
        validators: [Validators.minLength(3), Validators.required],
        updateOn: 'blur',
      }),
      lastName: new FormControl(null),
      phone: new FormControl(null),
      textNotifications: new FormControl(false, {
        validators: [Validators.required],
      }),
      emailNotifications: new FormControl(false, {
        validators: [Validators.required],
      }),
      theme: new FormControl(false, {
        validators: [Validators.required, Validators.pattern(/^(dark|light)$/)],
      }),
      isDriver: new FormControl(false, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
    });
  }

  ngOnInit(): void {
    this.selectTheme('light');
  }

  onSubmit() {
    console.log(this.registerGroup.valid);
    console.log(this.registerGroup.value);
  }

  selectTheme(theme: string) {
    this.registerGroup.get('theme')?.setValue(theme);
  }
}
