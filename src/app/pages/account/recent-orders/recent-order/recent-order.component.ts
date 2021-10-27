import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {OrderService} from "../../../../services/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css']
})
export class RecentOrderComponent {

  @Input() order: Order;

  constructor(private orderService: OrderService, private modalService: NgbModal, private cartService: CartService) {
  }

  reOrder (){
    for (let foodOrder of this.order.food) {
      for (let item of foodOrder.items){
        this.cartService.addToCart(item, foodOrder.restaurantId);
      }
    }
  }

  orderDetails(content) {
    this.modalService.open(content, {centered: true})
  }

  printFood(foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
  }
}
