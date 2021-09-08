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
  maxPageItemsSubject: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient, private errorHandler: UserErrorHandlerService) {
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
          this.placeOrder(orderDTO);
          this.clearCart.next();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  placeOrder(product) {
    let parameters = new HttpParams().set("userId", Number(localStorage.getItem("userId")));
    this.http.put(this.baseOrderURL, product, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params: parameters
    }).subscribe(
      (result) => {
        console.log(result);
      },
      () => {
        this.errorHandler.handleError('placeOrder', null);
      },
    );
  }

  printFood(foodOrder: FoodOrder): string {
    let items: string = '';
    if (foodOrder) {
      for (let index = 0; index < foodOrder.items.length; index ++) {
        if (index === foodOrder.items.length - 1){
          items += foodOrder.items[index].name;
        }else{
          items += foodOrder.items[index].name + ', ';
        }
      }
    }
    return items;
  }
}
