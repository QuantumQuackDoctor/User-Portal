import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../models/order/order";

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.css']
})
export class RecentOrdersComponent implements OnInit {

  recentOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.orderList.subscribe(res => {
      this.recentOrders = this.sortOrders(res);
    });
  }

  sortOrders(orders: Order[]): Order[] {
    let topFive: Order[] = [];
    orders.sort((a, b) => {
      let dateA = new Date(a.orderTime.restaurantAccept);
      let dateB = new Date(b.orderTime.restaurantAccept);
      if (dateA.getTime() < dateB.getTime()) {
        return 1;
      } else if (dateA.getTime() > dateB.getTime()) {
        return -1;
      }
      return 0;
    });

    for (let i = 0; i < 5; i++) {
      if (!orders[i]) break;
      topFive.push(orders[i]);
    }
    return topFive;
  }

}
