import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../shared.css'],
})
export class LoginFormComponent implements OnInit {
  loginGroup: FormGroup;
  emailIcon = faEnvelope;
  passwordIcon = faLock;
  loginError = false;
  errorMessage = '*email or password invalid';
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginGroup = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.minLength(8), Validators.required],
      }),
      isDriver: new FormControl(false),
    });
    this.route.queryParamMap.subscribe((map) => {
      this.returnUrl = map.get('returnUrl') || '/';
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginGroup.valid) {
      this.authService.login(this.loginGroup.value).subscribe(
        (res) => {
          this.loginError = false;
          this.router.navigate([this.returnUrl]);
        },
        (err) => {
          this.loginError = true;
          switch (err.status) {
            case 0:
              this.errorMessage = 'failed to connect to server';
              break;
            default:
              this.errorMessage = '*email or password invalid';
          }
        }
      );
    }
  }
}
