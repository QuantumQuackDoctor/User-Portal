import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {OrderService} from "../../../../services/order.service";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent {

  @Input() order: Order

  constructor(private orderService: OrderService) { }

  printFood (foodOrder: FoodOrder): string{
    return this.orderService.printFood(foodOrder);
  }

}
