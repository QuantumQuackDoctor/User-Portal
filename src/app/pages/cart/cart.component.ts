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

  selectedTime = 'Select Delivery Time';
  selectedDelivery = 'Select Delivery or Pickup';
  address = '';

  deliveryTypeList = [
    {type : 'Select Delivery or Pickup'},
    {type : 'Delivery'},
    {type : 'Pickup'}
  ]

  deliveryTimeList = [
    {type : 'Select Delivery Time'},
    {type : '15 Min (Fastest)'},
    {type : '30 Min'},
    {type : '45 Min'}
  ]

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

  checkRequiredFields () : boolean{

    let checkVar = true;

    if (this.selectedDelivery === 'Select Delivery or Pickup'){
      alert ("Please select delivery of pickup!")
      checkVar = false;
    }

    if (this.selectedTime === 'Select Delivery Time' && this.selectedDelivery === 'Delivery'){
      alert ("Please pick a delivery time!")
      checkVar = false;
    }

    if (this.address === '' && this.selectedDelivery === 'Delivery'){
      alert ("Please give a delivery address!")
      checkVar = false;
    }

    return checkVar;
  }

  getDeliveryTime() : Date {
    let currentDate = new Date();
    switch (this.selectedTime){
      case '15 Min (Fastest)':
        return new Date (currentDate.getTime() + 15*60000)
      case '30 Min':
        return new Date (currentDate.getTime() + 30*60000)
      case '45 Min':
        return new Date (currentDate.getTime() + 45*60000)
      default:
        return new Date (currentDate.getTime() + 15*60000)
    }
  }

  placeOrder() {
    if (this.checkRequiredFields()) {
      let deliveryTime = this.getDeliveryTime()
      let orderTime = new OrderTime(null, new Date(Date.now()),
        null, null, null, null,
        deliveryTime)
      let foodOrders: FoodOrder[] = []
      foodOrders.push(new FoodOrder("1", this.orderItems))
      let orderDTO = new Order(null, this.selectedDelivery.toLowerCase(), null, null,
        this.address, orderTime, false, new Price(this.cartTotal, null, null),
        foodOrders)
      this.msg.placeOrder(orderDTO)
      this.clearCart()
    }
  }
}