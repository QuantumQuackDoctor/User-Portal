import { Component, OnInit } from '@angular/core';
import {Order} from "../models/order/order";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {

  pendingOrders : Order[] = []

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  }



}
