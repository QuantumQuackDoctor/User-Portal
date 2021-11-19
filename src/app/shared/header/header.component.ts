import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {Subscription} from 'rxjs';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {SearchService} from '../../services/search.service';
import {AuthService} from 'src/app/services/auth.service';
import {CartService} from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated: boolean = false; //attach to auth service
  faUser = faUser;
  faSearch = faSearch;
  authSubscription?: Subscription;
  cartSubscription?: Subscription;
  searchIcon = faSearch;
  navbarCollapsed = true;
  navBarTogglerGreen = false;
  navbarTogglerTimer;

  constructor(
    private authService: AuthService,
    public router: Router,
    private searchService: SearchService,
    cartService: CartService
  ) {
    this.authSubscription = authService.authenticationStatus.subscribe(
      (status) => {
        this.isAuthenticated = status.valid;
      }
    );
    this.cartSubscription = cartService.cartSubject.subscribe(() => {
      this.navbarTogglerTimer && clearTimeout(this.navbarTogglerTimer);
      this.navBarTogglerGreen = true;
      this.navbarTogglerTimer = setTimeout(() => {
        this.navBarTogglerGreen = false;
      }, 500);
    });
  }

  searchInput(event: any) {
    this.router.navigate(['/search']);
    this.searchService.search = event.target.value;
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
  }
}
