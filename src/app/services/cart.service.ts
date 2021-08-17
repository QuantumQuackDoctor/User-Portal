import {Injectable} from '@angular/core';
import {Item} from '../models/item/item';
import {BehaviorSubject} from "rxjs";
import {FoodOrder} from "../models/FoodOrder/food-order";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  foodOrderHolder: FoodOrder[] = [];
  cartItemHolder: Item[] = [];
  cartTotal = 0;

  foodOrderSubject = new BehaviorSubject([]);
  cartItemsSubject = new BehaviorSubject([]);

  constructor() {
    let checkFoodOrders: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));
    let checkAllOrders: Item[] = JSON.parse(localStorage.getItem('items'));
    if (checkFoodOrders) this.foodOrderSubject.next(checkFoodOrders);
    if (checkAllOrders) this.cartItemsSubject.next(checkAllOrders);
  }

  getItems(): FoodOrder[] {
    //TODO: Populate  items from API and return an observable
    return this.foodOrderHolder;
  }

  /*  getCartByUser () : Item[]{
      this.placeHolder = JSON.parse(localStorage.getItem("orderItems"));
      return this.placeHolder;
    }*/

  addToItems(item: Item) {
    let checkAllOrders: Item[] = JSON.parse(localStorage.getItem('items'));

    if (checkAllOrders) {
      let itemExists: Item = checkAllOrders.find(cursorItem => {
        return cursorItem.id === item.id;
      });

      if (itemExists) {
        itemExists.quantity++;
        localStorage.setItem('items', JSON.stringify(checkAllOrders));
        this.cartItemsSubject.next(JSON.parse(localStorage.getItem('items')));
      } else {
        checkAllOrders.push(item);
        localStorage.setItem('items', JSON.stringify(checkAllOrders));
        this.cartItemsSubject.next(JSON.parse(localStorage.getItem('items')));
      }
    } else {
      localStorage.setItem('items', JSON.stringify([item]));
      this.cartItemsSubject.next(JSON.parse(localStorage.getItem('items')));
    }
  }

  addToCart(item: Item, menuId: number) {

    let check: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));

    let orderExists: FoodOrder;

    //if there is a cart of orders,
    //find the order that matches the menuID of item being added
    if (check) {
      orderExists = check.find((exItem) => {
        return exItem.restaurantId === menuId;
      });

      //if there is an order of other items from same menu
      if (orderExists) {
        let itemExists: Item = orderExists.items.find(orderItem => {
          return orderItem.id === item.id;
        })

        //if current item exits then increment quantity
        if (itemExists) {
          itemExists.quantity++;
          localStorage.setItem('cart', JSON.stringify(check));
         // this.foodOrderSubject.next(JSON.parse(localStorage.getItem('cart')));
        }
        //if no item then add item to list
        else {
          orderExists.items.push(item);
          localStorage.setItem('cart', JSON.stringify(check));
         // this.foodOrderSubject.next(JSON.parse(localStorage.getItem('cart')));
        }
      }
        //if no order from restaurant then make
      // new one and add to list of FoodOrders
      else {
        let newFoodOrder = new FoodOrder(menuId, null, [item]);
        check.push(newFoodOrder);
        localStorage.setItem('cart', JSON.stringify(check));
       // this.foodOrderSubject.next(JSON.parse(localStorage.getItem('cart')));
      }
    }
    // if no list of FoodOrders at all then make a new one
    else {
      let newFoodOrder = new FoodOrder(menuId, null, [item]);
      let newOrderList: FoodOrder[] = [newFoodOrder];
      localStorage.setItem('cart', JSON.stringify(newOrderList));
      //this.foodOrderSubject.next(JSON.parse(localStorage.getItem('cart')));
    }

    //put the current cart into placeholder
    this.foodOrderHolder = JSON.parse(localStorage.getItem('cart'));

    this.addToItems(item);

    //calculate the cartTotal
    let currentCart: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));
    this.cartTotal = 0
    currentCart.forEach((foodOrder: FoodOrder) => {
      foodOrder.items.forEach(item => {
        this.cartTotal += (item.quantity * item.price);
      })
    });
    this.foodOrderSubject.next(JSON.parse(localStorage.getItem('cart')));
  }

  clearCart() {
    //set quantity of all items to 1
    this.foodOrderHolder.forEach((foodOrder: FoodOrder) => {
      foodOrder.items.forEach(item => {
        item.quantity = 1;
      })
    });
    //empty the placeholder and remove from local storage
    //also set cart total to 0
    this.foodOrderHolder = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('items');
    this.cartTotal = 0;
  }

  /*  remove(item: Item) {
      for (let index in this.placeHolder) {
        if (this.placeHolder[index].id === item.id) {
          this.placeHolder[index].quantity--
          if (this.placeHolder[index].quantity <= 0) {
            delete this.placeHolder[index]
          }
        }
      }
    }*/

}
