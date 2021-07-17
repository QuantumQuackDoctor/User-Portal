import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ɵangular_packages_platform_browser_platform_browser_k } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  badCredentials = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
        updateOn: 'blur',
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8)],
        updateOn: 'blur',
      }),
      isDriver: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginGroup.valid) {
      this.authService.login(this.loginGroup.value).subscribe(
        (res) => this.router.navigate(['/home']),
        (err) => {
          switch (err.status) {
            case 0:
              console.log('failed to connect to server');
              //TODO change invalid credentials message
              break;
            case 401:
              console.log('authorization failed');
              break;
            default:
              console.log("really don't know what happened");
          }
        }
      );
    }
  }
}
