import {Component, Input} from '@angular/core';
import {Item} from '../../../models/item/item';
import {MessengerService} from '../../../services/messenger.service';
import {CartService} from '../../../services/cart.service';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
  @Input() orderItem?: Item;
  @Input() restaurantId: number;
  faDown = faAngleDown;
  faUp = faAngleUp;

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) {}

  incrementQuantity(amount: number) {
    this.cartService.incrementItem(
      this.orderItem.id,
      this.restaurantId,
      amount
    );
  }
}
