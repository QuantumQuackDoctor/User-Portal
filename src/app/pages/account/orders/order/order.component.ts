import {Component, Input, OnInit} from '@angular/core';
import {Order} from 'src/app/models/order/order';
import {KeyValue} from '@angular/common';
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {OrderService} from "../../../../services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() orderMap?: KeyValue<number, Order[]>;
  currentDate: Date;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.currentDate = new Date(Date.now());
  }

  emitOrder (order: Order): string{
    return order?.orderType.toUpperCase();
  }

  printFood(foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
  }
}
