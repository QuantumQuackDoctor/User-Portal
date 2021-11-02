import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {OrderService} from "../../../../services/order.service";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {CartService} from "../../../../services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RestaurantService} from "../../../../services/restaurant.service";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent {

  @Input() order: Order

  constructor(private orderService: OrderService, private cartService: CartService, private modalService: NgbModal,
              private restaurantService: RestaurantService) {
  }

  printFood (foodOrder: FoodOrder): string{
    return this.orderService.printFood(foodOrder);
  }

  orderDetails(content) {
    this.modalService.open(content, {centered: true})
  }

  reOrder (){
    for (let foodOrder of this.order.food) {
      for (let item of foodOrder.items){
        this.cartService.addToCart(this.restaurantService.getItems(foodOrder.restaurantId)
            .find (element => element.id == item.id),
          foodOrder.restaurantId);
      }
    }
  }
}
