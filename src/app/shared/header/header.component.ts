import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; //attach to auth service
  faUser = faUser;
  subscription?: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = authService.authenticationStatus.subscribe((status) => {
      this.isAuthenticated = status.valid;
    });
  }

  ngOnInit(): void {
    //check authentication status and set boolean
    this.authService.testAuthentication();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
