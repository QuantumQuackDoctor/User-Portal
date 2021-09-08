import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Order} from 'src/app/models/order/order';
import {OrderService} from 'src/app/services/order.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersComponent implements OnInit {
  orderList?: Map<number, Order[]> = new Map();
  fullOrderList: Order[];
  currentMonth: number;
  page: number = 1;
  faSearch = faSearch;
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
  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.orderService.orderList.subscribe((res) => {
      this.fullOrderList = res.sort((a, b) => {
        let dateA = new Date(a.orderTime.restaurantAccept);
        let dateB = new Date(b.orderTime.restaurantAccept);
        if (dateA.getTime() < dateB.getTime()) {
          return 1;
        } else if (dateA.getTime() > dateB.getTime()) {
          return -1;
        }
        return 0;
      });
      this.currentMonth = new Date(this.fullOrderList[0].orderTime.restaurantAccept).getMonth() + 1;
    });
    this.authService.authenticationStatus.subscribe((status) => {
      if (status.valid) {
        this.orderService.getOrders();
      }
    });
  }

/*  sortOrdersByMonth(orderList: Order[]): Map<number, Order[]> {
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
  }*/

/*  keyDescOrder = (
    a: KeyValue<number, Order[]>,
    b: KeyValue<number, Order[]>
  ): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };*/

  checkMonthChange(order: Order, cursor: number): boolean {
    let month = new Date(order.orderTime.restaurantAccept).getMonth() + 1;
    if (this.currentMonth != month) {
      this.currentMonth = month;
      return true;
    }else return cursor === 0;
  }
}
