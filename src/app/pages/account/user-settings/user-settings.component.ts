import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserSettingsComponent implements OnInit {
  @Input() user: User = {
    email: '',
    firstName: '',
    settings: { notifications: { text: false, email: false }, theme: 'light' },
  };
  inputsDisabled: boolean = true;
  faPen = faPen;

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  delete(): void {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DeleteAccountDialogComponent, dialogConfig);
  }
}
