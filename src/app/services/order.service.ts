import { Injectable } from '@angular/core';
import {Order} from "../models/order/order";
import {HttpClient} from "@angular/common/http";
import {Observable, of, Subject} from "rxjs";
import {MessengerService} from "./messenger.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseOrderURL = "http://localhost:4200/order"
  orderList : Subject<Order[]> = new Subject<Order[]>()

  constructor(private http: HttpClient, private msgService: MessengerService) { }

  private log (message: string){
    this.msgService.addMsg(`OrderService: ${message}`);
  }

  getOrders() {
    this.http.get <Order[]> (this.baseOrderURL).subscribe(
      res => {
        this.orderList.next(res);
      },
      () => {
        this.handleError<Order[]> ('getOrders', [])
      }
    );
/*      .pipe(
        tap (_ => this.log ('Orders fetched')),
        catchError (this.handleError<Order[]> ('getOrders', []))
      );*/
  }

  /**
   * Handle Http errors
   * Allows the app to continue
   */
  private handleError<T> (operation = 'operation', result? : T){
      return (error : any ): Observable<T> => {
        console.error (error);

        console.log (`${operation} failed : ${error.message}`);
        this.log(`${operation} failed : ${error.message}`);

        return of (result as T);
      }
  }
}
