import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()

  constructor(private http: HttpClient) { }

  sendMsg(product) {
    this.subject.next(product) //Triggering event
  }

  getMsg(){
    return this.subject.asObservable()
  }

  placeOrder (product){
    let url = "http://localhost:4200/order";
    console.log(product)
    this.http.put (url, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe(
      () => {
        alert ("Order Placed!")
      },
      error => {
        alert (error)
      }
    );
  }
}
