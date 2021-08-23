import {Component, OnInit} from '@angular/core';
import {
  faIdCard,
  faCalendar,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {User} from 'src/app/models/User';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserService} from "../../../services/user-service.service";
import {UserProfile} from "../../../models/user-profile";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User/* = {
    email: '',
    firstName: '',
    settings: {notifications: {text: false, email: false}, theme: 'light'},
  };*/

  profileRegisterGroup: FormGroup;

  inputsDisabled: boolean = true;
  faPen = faPen;
  nameIcon = faIdCard;
  dateIcon = faCalendar;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    //TODO refactor to diff methods
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
          validators: [Validators.minLength(3), Validators.required],
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
      this.userService.updateProfile(this.updateInfo());
    }

  }

  updateInfo(): UserProfile {
    let updatedUser = new UserProfile();
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
    this.inputsDisabled = !this.inputsDisabled;
  }
}
