import { Pipe, PipeTransform } from '@angular/core';
import {Order} from "../models/order/order";

@Pipe({
  name: 'orderFilter'
})
export class OrderFilterPipe implements PipeTransform {

  transform(orders: Order[], searchText: string, minPrice: number): Order[] {
    if (!orders) return [];
    if (minPrice){
      orders.filter (order => {
        return order.price.food >= minPrice;
      });
    }
    if (!searchText) return orders;
    searchText = searchText.toLowerCase();
    return orders.filter (order => {
      for (let foodOrder of order.food){
        if (foodOrder.restaurantName.toLowerCase().includes(searchText))
          return true;
      }return false;
    });
  }

}
