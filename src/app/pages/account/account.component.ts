import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {User} from 'src/app/models/User';
import {AuthService} from 'src/app/services/auth.service';
import {UserService} from 'src/app/services/user-service.service';
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order/order";

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
  orderList?: Map<number, Order[]> = new Map();

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private authService: AuthService,
    router: Router
  ) {
    this.router = router;

  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticationStatus.subscribe((status) => {
      this.userIsAuthenticated = status.valid;
      if (status.valid) {
        this.userService.getUserDetails().subscribe((user) => {
          this.user = user;
          this.userService.updateUser(user);
          this.orderService.getOrders();
          localStorage.setItem ('userEmail', user.email);
        });
      } else {
        this.router.navigate(['/home']);
      }
    });

  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
