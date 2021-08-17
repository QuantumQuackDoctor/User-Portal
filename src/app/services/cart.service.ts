import { Injectable } from '@angular/core';
import { Item } from '../models/item/item';
import { BehaviorSubject } from 'rxjs';
import { FoodOrder } from '../models/FoodOrder/food-order';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  currentCart: FoodOrder[] = [];
  cartItemHolder: Item[] = [];
  cartTotal = 0;

  cartSubject = new BehaviorSubject<FoodOrder[]>([]);

  constructor() {
    let savedCart: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));
    savedCart && this.setCart(savedCart);
  }

  addToCart(item: Item, restaurantId: number) {
    let currentCart: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));

    if (currentCart) {
      let matchingOrder = this.findMatchingRestaurantOrder(
        currentCart,
        restaurantId
      );

      if (matchingOrder) {
        let itemExists = this.findMatchingItem(matchingOrder, item.id);

        if (itemExists) {
          itemExists.quantity++;
        } else {
          matchingOrder.items.push(item);
        }
      } else {
        let newFoodOrder = new FoodOrder(restaurantId, null, [item]);
        currentCart.push(newFoodOrder);
      }
    } else {
      let newFoodOrder = new FoodOrder(restaurantId, null, [item]);
      currentCart = [newFoodOrder];
    }

    this.setCart(currentCart);
  }

  private setCart(cart: FoodOrder[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.currentCart = cart;
    this.cartTotal = this.calculateCartTotal(cart);
    this.cartSubject.next(JSON.parse(localStorage.getItem('cart')));
  }

  getCart() {
    return this.currentCart;
  }

  private findMatchingRestaurantOrder(
    foodOrder: FoodOrder[],
    restaurantId: number
  ): FoodOrder {
    return foodOrder.find((exItem) => {
      return exItem.restaurantId === restaurantId;
    });
  }

  private findMatchingItem(foodOrder: FoodOrder, itemId: number) {
    return foodOrder.items.find((orderItem) => {
      return orderItem.id === itemId;
    });
  }

  updateCartTotal() {
    let currentCart: FoodOrder[] = JSON.parse(localStorage.getItem('cart'));
    this.cartTotal = this.calculateCartTotal(currentCart);
  }

  private calculateCartTotal(cart: FoodOrder[]) {
    let total = 0;
    cart.forEach((foodOrder: FoodOrder) => {
      foodOrder.items.forEach((item) => {
        total += item.quantity * item.price;
      });
    });
    return total;
  }

  clearCart() {
    //set quantity of all items to 1
    this.currentCart.forEach((foodOrder: FoodOrder) => {
      foodOrder.items.forEach((item) => {
        item.quantity = 1;
      });
    });
    //empty the placeholder and remove from local storage
    //also set cart total to 0
    this.currentCart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('items');
    this.cartTotal = 0;
  }

  incrementItem(itemId: number, restaurantId: number, amount: number) {
    let matchingRestaurant = this.findMatchingRestaurantOrder(
      this.currentCart,
      restaurantId
    );
    let matchingOrder = this.findMatchingItem(matchingRestaurant, itemId);
    matchingOrder.quantity = Math.max(matchingOrder.quantity + amount, 1);
    this.setCart(this.currentCart);
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

  removeItem(restaurantId: number, itemId: number) {
    let foodOrder = this.currentCart.find(
      (order) => order.restaurantId === restaurantId
    );
    foodOrder.items = foodOrder.items.filter((item) => item.id !== itemId);
    if (foodOrder.items.length === 0)
      this.currentCart = this.currentCart.filter(
        (order) => order.restaurantId !== restaurantId
      );
    this.setCart(this.currentCart);
  }
}
