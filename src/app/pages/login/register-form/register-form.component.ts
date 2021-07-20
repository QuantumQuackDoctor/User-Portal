import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  displayError = false;
  errorMessage = '*email or password invalid';
  returnUrl: string = '/';
  subscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    });
    this.subscription = route.queryParamMap.subscribe((map) => {
      this.returnUrl = map.get('returnUrl') || '/';
    });
  }

  ngOnInit(): void {
    this.selectTheme('light');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    if (this.registerGroup.valid) {
      this.authService.register(this.createUser()).subscribe(
        (res) => {
          this.displayError = false;
          this.router.navigate(['/account/login'], {
            queryParams: { returnUrl: this.returnUrl },
          });
        },
        (error) => {
          this.displayError = true;
          switch (error.status) {
            case 0:
              this.errorMessage = '*server error';
              break;
            case 409:
              this.errorMessage = '*email taken';
              break;
            default:
              this.errorMessage = '*not sure';
          }
        }
      );
    }
  }

  private createUser(): User {
    const formValue = this.registerGroup.value;
    return {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      settings: {
        notifications: {
          email: formValue.emailNotifications,
          text: formValue.textNotifications,
        },
        theme: formValue.theme,
      },
    };
  }

  selectTheme(theme: string) {
    this.registerGroup.get('theme')?.setValue(theme);
  }
}
