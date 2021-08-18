import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/order.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersComponent implements OnInit {
  orderList?: Map<number, Order[]> = new Map();
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders();
    this.orderService.orderList.subscribe((res) => {
      this.orderList = this.sortOrderByDate(res);
    });
  }

  sortOrderByDate(orderList: Order[]): Map<number, Order[]> {
    let map: Map<number, Order[]> = new Map();
    orderList.sort((a, b) => {
      let dateA = new Date(a.orderTime.restaurantAccept);
      let dateB = new Date(b.orderTime.restaurantAccept);
      if (dateA.getTime() < dateB.getTime()) {
        return 1;
      } else if (dateA.getTime() > dateB.getTime()) {
        return -1;
      }
      return 0;
    });
    for (let order of orderList) {
      let month = new Date(order.orderTime.restaurantAccept).getMonth() + 1;
      if (map.has(month)) {
        map.get(month).push(order);
      } else {
        map.set(month, [order]);
      }
    }
    return map;
  }

  keyDescOrder = (
    a: KeyValue<number, Order[]>,
    b: KeyValue<number, Order[]>
  ): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };
}
