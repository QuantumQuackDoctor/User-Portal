import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {User} from 'src/app/models/User';
import {AuthService} from 'src/app/services/auth.service';
import {DeleteAccountDialogComponent} from '../delete-account-dialog/delete-account-dialog.component';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserSettingsComponent implements OnInit {
  user: User;
  inputsDisabled: boolean = true;
  faPen = faPen;
  settingsFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.userDetails.subscribe( (user) => {
      this.user = user;
      this.settingsFormGroup = new FormGroup({
        text: new FormControl (this.user.settings.notifications.text, Validators.required),
        email: new FormControl (this.user.settings.notifications.email, Validators.required),
        theme: new FormControl(this.user.settings.theme, Validators.required)
      });
      this.settingsFormGroup.disable();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  toggleInput() {
    if (this.settingsFormGroup.disabled)
      this.settingsFormGroup.enable();
    else{
      this.settingsFormGroup.disable();
      location.reload();
    }
  }

  delete(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DeleteAccountDialogComponent, dialogConfig);
  }

  updateSettings () {
    this.settingsFormGroup.updateValueAndValidity();
    let formValues = this.settingsFormGroup.value;
    let updatedSettings = {
      notifications: {
        email: formValues.email,
        text: formValues.text
      },
      theme: formValues.theme
    }
    this.userService.updateSettings (updatedSettings);
    this.settingsFormGroup.disable();
  }
}
