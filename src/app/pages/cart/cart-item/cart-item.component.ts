import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../../models/item/item";
import {MessengerService} from "../../../services/messenger.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() orderItem? : Item

  constructor(private msg : MessengerService, private cartService : CartService) {
  }

  ngOnInit(): void {
  }

  remove (item : Item){
    this.cartService.remove(item)
    this.msg.sendMsg(item)
  }
}
