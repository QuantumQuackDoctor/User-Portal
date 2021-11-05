import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user-service.service';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.css'],
})
export class DeleteAccountDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  delete(): void {
    this.dialogRef.close();
    this.userService.deleteUser().subscribe(() => {
      this.authService.logout();
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
