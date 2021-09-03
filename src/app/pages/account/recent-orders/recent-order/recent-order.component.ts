import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css']
})
export class RecentOrderComponent implements OnInit {

  @Input() order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  printFood (foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
  }
}
