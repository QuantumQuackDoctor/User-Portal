import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators,} from '@angular/forms';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from 'src/app/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/models/User';
import {Subscription} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['../shared.css'],
})
export class RegisterFormComponent implements OnInit, OnDestroy {
  registerGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  displayError = false;
  errorMessage = '*email or password invalid';
  returnUrl: string = '/';
  subscription?: Subscription;
  hasSubmitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    route: ActivatedRoute
  ) {
    this.registerGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8), Validators.required],
      }),
      DOB: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
          (control: AbstractControl): ValidationErrors | null => {
            let dateDiff = Date.now() - Date.parse(control.value);
            let ageDate = new Date(dateDiff);
            if (ageDate.getUTCFullYear() - 1970 >= 18) return null;
            return {
              tooYoung: { value: control.value },
            };
          },
        ],
      }),
      firstName: new FormControl(null, {
        validators: [Validators.minLength(3), Validators.required],
      }),
      lastName: new FormControl(null),
      phone: new FormControl(null, {
        validators: [
          (control: AbstractControl): ValidationErrors | null => {
            if (
              !control.value ||
              control.value.length === 0 ||
              (control.value.length === 10 && !isNaN(control.value))
            ) {
              return null;
            }
            return { invalidPhoneNumber: { value: control.value } };
          },
        ],
      }),
      veteranStatus: new FormControl(false, Validators.required),
      textNotifications: new FormControl(false, {
        validators: [
          Validators.required,
          (control: AbstractControl): ValidationErrors | null => {
            //if user would like to recieve text notifications they must have a valid phone number
            if (control.value === false) {
              return null;
            }
            if (this.phonePresentAndValid()) {
              return null;
            }
            return {
              invalidPhoneNumber: { value: control.value },
            };
          },
        ],
      }),
      emailNotifications: new FormControl(false, {
        validators: [Validators.required],
      }),
      emailOrder: new FormControl(false, {validators: [Validators.required]}),
      emailDelivery: new FormControl(false, {validators: [Validators.required]}),
      theme: new FormControl(false, {
        validators: [Validators.required, Validators.pattern(/^(dark|light)$/)],
      }),
    });
    this.subscription = route.queryParamMap.subscribe((map) => {
      this.returnUrl = map.get('returnUrl') || '/';
    });
  }

  private phonePresentAndValid(): boolean {
    let phone = this.registerGroup.get('phone');
    return phone.value !== null && phone.value.length > 0 && phone.valid;
  }

  ngOnInit(): void {
    this.selectTheme('light');
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    this.registerGroup.updateValueAndValidity();
    if (this.registerGroup.valid && !this.hasSubmitted) {
      this.hasSubmitted = true;
      this.authService.register(this.createUser()).subscribe(
        () => {
          this.displayError = false;
          this.router.navigate(['/account/login'], {
            queryParams: { returnUrl: this.returnUrl },
          });
        },
        (err: HttpErrorResponse) => {
          this.hasSubmitted = false;
          this.displayError = true;
          switch (err.status) {
            case 409:
              this.errorMessage = '*email taken';
              break;
            default:
              this.errorMessage = '*failed to connect to server';
          }
        }
      );
    }
  }

  private createUser(): User {
    const formValue = this.registerGroup.value;
    let defaultEmailOptions: boolean = false;
    if (formValue.emailNotifications){
      defaultEmailOptions = true;
    }
    return {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      isVeteran: formValue.veteranStatus,
      DOB: formValue.DOB,
      orders: [],
      settings: {
        notifications: {
          email: formValue.emailNotifications,
          emailOrder: defaultEmailOptions,
          emailDelivery: defaultEmailOptions,
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
