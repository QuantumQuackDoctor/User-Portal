import {EventEmitter, Injectable} from '@angular/core';
import {Order} from "../models/order/order";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {UserErrorHandlerService} from "./user-error-handler.service";
import {ChargeResponse} from "../models/charge-response";
import {ChargeRequest} from "../models/charge-request";
import {FoodOrder} from "../models/FoodOrder/food-order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseOrderURL = "http://localhost:4200/order"
  orderList: Subject<Order[]> = new Subject<Order[]>()
  clearCart: EventEmitter<any> = new EventEmitter<any>()

  constructor(private http: HttpClient, private errorHandler: UserErrorHandlerService) {
  }

  cancelOrder(order: Order) {
    let deleteParams = new HttpParams().set ('id', order?.id);
    this.http.delete(this.baseOrderURL + '/user', {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: deleteParams
    }).subscribe(() =>{

      });
  }

  updateOrderDetail(order: Order) {
    this.http.patch(this.baseOrderURL + '/details', order, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(() => {
      this.getOrders();
    })
  }

  getOrders() {
    this.http.get <Order[]>(this.baseOrderURL + "/user").subscribe(
      res => {
        this.orderList.next(res);
      },
      () => {
        this.errorHandler.handleError<Order[]>('getOrders', [])
      }
    );
  }

  processPayment(chargeRequest: ChargeRequest, orderDTO: Order) {
    this.http.post(this.baseOrderURL + '/charge', chargeRequest).subscribe(
      (chargeResponse: ChargeResponse) => {
        if (chargeResponse.error.length != 0) {
          alert(chargeResponse.error);
        } else {
          alert("Thanks for the money");
          this.placeOrder(orderDTO, JSON.parse(chargeResponse.charge).id);
          this.clearCart.next();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  placeOrder(product: Order, chargeId: string) {
    let orderParams = new HttpParams().set ('chargeId', chargeId);
    this.http.put(this.baseOrderURL, product, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: orderParams
    }).subscribe(
      (result) => {
        let orderNotification = JSON.parse(localStorage.getItem('emailOrder'));
        if (orderNotification)
          this.sendOrderEmail(result);
      },
      () => {
        this.errorHandler.handleError('placeOrder', null);
      },
    );
  }

  sendOrderEmail(orderResponse) {
    this.http.post(this.baseOrderURL + '/email-order', orderResponse);
  }

  printFood(foodOrder: FoodOrder): string {
    let items: string = '';
    if (foodOrder) {
      for (let index = 0; index < foodOrder.items.length; index++) {
        if (index === foodOrder.items.length - 1) {
          items += foodOrder.items[index].name + " x " + foodOrder.items[index].quantity;
        } else {
          items += foodOrder.items[index].name + " x " + foodOrder.items[index].quantity + ', ';
        }
      }
    }
    return items;
  }
}
