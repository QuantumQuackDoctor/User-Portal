import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() orderMap?: KeyValue<number, Order[]>;
  currentDate: Date;

  constructor() {}

  ngOnInit(): void {
    this.currentDate = new Date(Date.now());
  }

  printFood(order: Order): string {
    let items: string = '';
    if (order) {
      for (let foodOrder of order.food) {
        items += foodOrder.restaurantName + ': ';
        for (let item of foodOrder.items) {
          items += item.name + ', ';
        }
        items += '\n';
      }
    }
    return items;
  }
}
