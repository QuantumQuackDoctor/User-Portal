import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  baseOrderURL = "http://localhost:4200/order"
  subject = new Subject()
  messages: string [] = []

  constructor(private http: HttpClient) {
  }

  addMsg(message: string) {
    this.messages.push(message)
  }

  sendMsg(product) {
    this.subject.next(product) //Triggering event
  }

  getMsg() {
    return this.subject.asObservable()
  }

  placeOrder(product) {
    console.log(product)
    this.http.put(this.baseOrderURL, product, {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }).subscribe(
      () => {
        alert("Order Placed!")
      },
      error => {
        alert(error)
      }
    );
  }
}
