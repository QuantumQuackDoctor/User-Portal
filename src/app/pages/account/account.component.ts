import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user?: User;
  userIsAuthenticated: boolean = false;
  router: Router;
  subscription: Subscription;

  constructor(
    userService: UserService,
    authService: AuthService,
    router: Router
  ) {
    this.router = router;
    this.subscription = authService.authenticationStatus.subscribe((status) => {
      this.userIsAuthenticated = status.valid;
      if (status.valid) {
        userService.getUserDetails().subscribe((user) => {
          this.user = user;
        });
      } else {
        router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
