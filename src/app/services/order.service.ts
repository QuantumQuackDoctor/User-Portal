import { Injectable } from '@angular/core';
import {Order} from "../models/order/order";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orders : Order[] = []
  subject = new Subject()

  constructor() { }

  getOrders() {
    return this.orders;
  }
}
