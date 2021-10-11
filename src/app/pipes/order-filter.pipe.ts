import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Order} from "../models/order/order";

@Pipe({
  name: 'orderFilter',
  pure: false,
})
@Injectable({
  providedIn: 'root',
})
export class OrderFilterPipe implements PipeTransform {

  transform(orders: Order[], searchText: string, priceRanges: { minPrice: number, maxPrice: number }[], startDate: Date, endDate: Date): Order[] {
    if (!orders) return [];
    if (priceRanges.length > 0) {
      orders = orders.filter(order => {
        for (let priceRange of priceRanges) {
          if ((order.price.food >= priceRange.minPrice) && ((priceRange.maxPrice) ? order.price.food < priceRange.maxPrice : true))
            return true;
        }
        return false;
      });
    }
    if (startDate != undefined || endDate != undefined) {
      orders = orders.filter(order => {
        let orderTime: number = new Date(order.orderTime.restaurantAccept).getTime();
        if (startDate != undefined) {
          return (orderTime >= startDate.getTime()) && (endDate ? endDate.getTime() > orderTime : true);
        } else {
          return (orderTime < endDate.getTime());
        }
      });
    }
    if (!searchText) return orders;
    searchText = searchText.toLowerCase();

    return orders.filter(order => {
      let includes = (item) => item.name.toLowerCase().includes(searchText.toLowerCase());
      for (let foodOrder of order.food) {
        if (foodOrder.restaurantName.toLowerCase().includes(searchText) || foodOrder.items.some(includes))

          return true;
      }
      return false;
    });
  }

}
