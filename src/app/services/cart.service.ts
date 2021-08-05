import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Item} from '../models/item/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private CART_URL = "http://localhost:8080/order";

  orderItems: Item[] = []
  cartTotal = 0

  constructor() {
  }

  getItems(): Item[] {
    //TODO: Populate  items from API and return an observable
    return this.orderItems
  }

  addToCart(item: Item) {

    let productExists = false

    for (let index in this.orderItems) {
      if (this.orderItems[index].id === item.id) {
        this.orderItems[index].quantity++
        productExists = true
        break;
      }
    }
    if (!productExists) {
      this.orderItems.push(item)
    }
    this.cartTotal = 0
    this.orderItems.forEach(item => {
      this.cartTotal += (item.quantity * item.price)
    })
  }

  clearCart(){
    this.orderItems.forEach(item => {
      item.quantity = 1;
    })
    this.orderItems = []
  }

  remove (item : Item){
    for (let index in this.orderItems) {
      if (this.orderItems[index].id === item.id) {
        this.orderItems[index].quantity--
        if (this.orderItems[index].quantity <= 0){
          delete this.orderItems[index]
        }
      }
    }
  }

}
