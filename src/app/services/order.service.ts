import {Injectable} from '@angular/core';
import {Order} from "../models/order/order";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Subject} from "rxjs";
import {UserErrorHandlerService} from "./user-error-handler.service";
import {ChargeResponse} from "../models/charge-response";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseOrderURL = "http://localhost:4200/order"
  orderList: Subject<Order[]> = new Subject<Order[]>()

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

  processPayment(tokenId: string) {
    this.http.post(this.baseOrderURL + '/charge', tokenId).subscribe(
      (chargeResponse: ChargeResponse) => {
        if (chargeResponse.error.length != 0){
          alert(chargeResponse.error);
        }else{
          alert ("Thanks for the money");
        }
        console.log(chargeResponse);
      },
      error => {
        console.log(error);
      }
    )
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
}
