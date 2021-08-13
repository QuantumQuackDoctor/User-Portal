import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService, AuthToken } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; //attach to auth service
  faUser = faUser;
  subscription?: Subscription;
  navbarCollapsed = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.authenticationStatus.subscribe(
      (status) => this.onStatusUpdate(status)
    );
  }

  onStatusUpdate(status: AuthToken) {
    this.isAuthenticated = status.valid;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
