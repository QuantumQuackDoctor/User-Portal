import {Component} from '@angular/core';
import {faCalendar, faEnvelope, faIdCard,} from '@fortawesome/free-regular-svg-icons';
import {faPen, faPhone} from '@fortawesome/free-solid-svg-icons';
import {User} from 'src/app/models/User';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserDetailsComponent {
  user: User

  profileRegisterGroup: FormGroup;

  inputsDisabled: boolean = true;
  faPen = faPen;
  nameIcon = faIdCard;
  dateIcon = faCalendar;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;

  constructor(private userService: UserService,
              private authService: AuthService,
              private router: Router,) {
    this.userService.userDetails.subscribe((user: User) => {
      this.user = user;
      this.profileRegisterGroup = new FormGroup({
        email: new FormControl(this.user.email, {
          validators: [Validators.email, Validators.required],
        }),
        DOB: new FormControl(this.user.DOB, {
          validators: [
            Validators.required,
            Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
            (control: AbstractControl): ValidationErrors | null => {
              let dateDiff = Date.now() - Date.parse(control.value);
              let ageDate = new Date(dateDiff);
              if (ageDate.getUTCFullYear() - 1970 >= 18) return null;
              return {
                tooYoung: {value: control.value},
              };
            },
          ],
        }),
        firstName: new FormControl(this.user.firstName, {
          validators: [Validators.minLength(3),
            Validators.pattern ( '^[a-zA-Z ]*$'),
            Validators.required],
        }),
        lastName: new FormControl(this.user.lastName),
        phone: new FormControl(this.user.phone, {
          validators: [
            (control: AbstractControl): ValidationErrors | null => {
              if (
                //TODO validate with regex
                !control.value ||
                control.value.length === 0 ||
                (control.value.length === 10 && !isNaN(control.value))
              ) {
                return null;
              }
              return {invalidPhoneNumber: {value: control.value}};
            },
          ],
        }),
      });
    });
  }


  profileUpdate() {
    this.profileRegisterGroup.updateValueAndValidity();
    if (this.profileRegisterGroup.valid) {
      if (this.user.email != this.profileRegisterGroup.value.email){
        this.userService.updateProfile(this.updateInfo());
        this.authService.logout();
        this.router.navigate(['/home']);
      }
      this.userService.updateProfile(this.updateInfo());
      this.inputsDisabled = true;
    }

  }

  updateInfo(): User {
    let updatedUser = this.user;
    updatedUser.password = 'dummypassword';
    let formValues = this.profileRegisterGroup.value;
    updatedUser.id = this.user.id;
    updatedUser.DOB = formValues.DOB;
    updatedUser.email = formValues.email;
    updatedUser.firstName = formValues.firstName;
    updatedUser.lastName = formValues.lastName;
    updatedUser.phone = formValues.phone;
    return updatedUser;
  }

  toggleInput() {
    if (!this.inputsDisabled)
      location.reload();
    this.inputsDisabled = !this.inputsDisabled;
  }
}
