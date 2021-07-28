import {Component, OnInit} from '@angular/core';
import {CartService} from "src/app/services/cart.service";
import {Item} from "src/app/models/item/item";
import {MessengerService} from "../../services/messenger.service";
import {Order} from "../../models/order/order";
import {Price} from "../../models/price/price";
import {FoodOrder} from "../../models/FoodOrder/food-order";
import {OrderTime} from "../../models/OrderTime/order-time";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderItems: Item[] = []
  cartTotal = 0

  constructor(private cartService: CartService, private msg: MessengerService) {

  }

  ngOnInit() {
    this.msg.getMsg().subscribe((item: Item) => {
      this.cartService.addToCart(item)
      this.orderItems = this.cartService.getItems()
      this.cartTotal = this.cartService.cartTotal
    })
  }

  clearCart(){
    this.cartService.clearCart()
    this.orderItems = this.cartService.getItems()
    this.cartTotal = this.cartService.cartTotal
  }

  placeOrder() {
    let orderTime = new OrderTime (null,"2011-12-03T04:15:30-05:00[America/New_York]",
      null, null, null, null,
      "2011-12-03T04:35:30-05:00[America/New_York]")
    let foodOrders : FoodOrder[] = []
    foodOrders.push (new FoodOrder("1", this.orderItems))
    let orderDTO = new Order(null, "delivery", null, null,
      "123 street", orderTime, false, new Price(this.cartTotal, null, null),
      foodOrders)
    this.msg.placeOrder(orderDTO)
  }

}
