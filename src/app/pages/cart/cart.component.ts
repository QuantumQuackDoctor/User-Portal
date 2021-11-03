import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from 'src/app/services/cart.service';
import {Order} from '../../models/order/order';
import {Price} from '../../models/price/price';
import {FoodOrder} from '../../models/FoodOrder/food-order';
import {OrderTime} from '../../models/OrderTime/order-time';
import {CreateTokenComponent} from "./create-token/create-token.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  @ViewChild(CreateTokenComponent) createToken: CreateTokenComponent;

  orderDetails: FormGroup;

  selectedTime = 'Select Delivery Time';
  selectedDelivery = 'Select Delivery or Pickup';
  address = '';

  deliveryTypeList = [
    {type: 'Select Delivery or Pickup'},
    {type: 'Delivery'},
    {type: 'Pickup'},
  ];

  deliveryTimeList = [
    {type: 'Select Delivery Time'},
    {type: '15 Min (Fastest)'},
    {type: '30 Min'},
    {type: '45 Min'},
  ];

  foodOrders: FoodOrder[] = [];
  cartTotal = 0;

  constructor(
    private modalService: NgbModal,
    private cartService: CartService,
  ) {
    this.orderDetails = new FormGroup({
      driverNote: new FormControl("", Validators.required),
      restaurantNote: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.cartService.cartSubject.subscribe((foodOrders: FoodOrder[]) => {
      this.foodOrders = foodOrders;
      this.cartTotal = this.cartService.cartTotal;
    });
  }

  openModal(content) {
    this.modalService.open(content, {centered: true})
  }

  clearCart() {
    this.cartService.clearCart();
    this.foodOrders = [];
    this.cartTotal = this.cartService.cartTotal;
  }

  checkRequiredFields(): boolean {
    let checkVar = true;

    if (this.selectedDelivery === 'Select Delivery or Pickup') {
      alert('Please select delivery of pickup!');
      checkVar = false;
    }

    if (
      this.selectedTime === 'Select Delivery Time' &&
      this.selectedDelivery === 'Delivery'
    ) {
      alert('Please pick a delivery time!');
      checkVar = false;
    }

    if (this.address === '' && this.selectedDelivery === 'Delivery') {
      alert('Please give a delivery address!');
      checkVar = false;
    }

    return checkVar;
  }

  getDeliveryTime(): Date {
    switch (this.selectedTime) {
      case '15 Min (Fastest)':
        return new Date(Date.now() + 15 * 60000);
      case '30 Min':
        return new Date(Date.now() + 30 * 60000);
      case '45 Min':
        return new Date(Date.now() + 45 * 60000);
      default:
        return new Date(Date.now() + 15 * 60000);
    }
  }

  convertToUTC (date: Date): Date{
    date.setFullYear(date.getUTCFullYear());
    date.setMonth(date.getUTCMonth());
    date.setDate(date.getUTCDate());
    date.setHours(date.getUTCHours());
    date.setMinutes(date.getUTCMinutes());
    date.setSeconds(date.getUTCSeconds());
    date.setMilliseconds(date.getUTCMilliseconds());

    return date;
  }

  placeOrder() {
    this.orderDetails.updateValueAndValidity();
    let formValues = this.orderDetails.value;
    if (this.checkRequiredFields()) {
      let deliveryTime: Date = this.convertToUTC(this.getDeliveryTime());
      let currentUTC: Date = this.convertToUTC(new Date());

      let orderTime = new OrderTime(
        currentUTC,
        null,
        null,
        null,
        null,
        null,
        deliveryTime
      );

      let foodOrders: FoodOrder[] = this.foodOrders;

      foodOrders.forEach((foodOrder) => {
        foodOrder.items.forEach((item) => {
          item.configurations = [];
          item.configurations.push(item.quantity.toString());
        });
      });

      let orderDTO = new Order(
        null,
        this.selectedDelivery.toLowerCase(),
        null,
        this.address,
        orderTime,
        false,
        new Price(this.cartTotal * 100, null, null),
        foodOrders
      );

      orderDTO.restaurantNote = formValues.restaurantNote;
      orderDTO.driverNote = formValues.driverNote;

      console.log (orderDTO);

      this.createToken.createToken(orderDTO);
    }
  }
}
