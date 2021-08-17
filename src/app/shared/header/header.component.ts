import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  searchIcon = faSearch;
  navbarCollapsed = true;

  constructor(
    private authService: AuthService,
    public router: Router,
    private searchService: SearchService
  ) {
    this.subscription = authService.authenticationStatus.subscribe((status) => {
      this.isAuthenticated = status.valid;
    });
  }

  searchInput(event: any) {
    this.router.navigate(['/search']);
    this.searchService.search = event.target.value;
  }

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
