import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FoodOrder } from 'src/app/models/FoodOrder/food-order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  styleUrls: ['./cart-dropdown.component.css'],
})
export class CartDropdownComponent implements OnInit {
  faCart = faShoppingCart;
  cartSubscription?: Subscription;
  currentCart: FoodOrder[];
  numItems: number = 0;
  @ViewChild('myDrop') dropdown: NgbDropdown;

  constructor(private cartService: CartService, private router: Router) {
    this.cartSubscription = cartService.cartSubject.subscribe((cart) => {
      this.currentCart = cart;
      this.numItems = this.countItems(cart);
      if (this.dropdown) this.openDelayed();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  private openDelayed() {
    setTimeout(() => {
      this.dropdown.open();
    }, 5);
  }

  private countItems(cart: FoodOrder[]): number {
    let sum = 0;
    cart.forEach((order) => {
      order.items.forEach((item) => {
        sum++;
      });
    });
    return sum;
  }

  remove(restaurantId: number, itemId: number) {
    this.cartService.removeItem(restaurantId, itemId);
  }
}
