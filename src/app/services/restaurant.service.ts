import { Injectable } from '@angular/core';
import {Item} from "../models/item/item";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  Items1 : Item[] = [
    new Item(1, 'Big Mac', 5.3, 'Sample description 1', 1,
      'https://thewoksoflife.com/wp-content/uploads/2020/04/homemade-chinese-egg-noodles-19-e1609271249794.jpg', ''),
    new Item(2, '20 Pc McNuggets', 5.78, 'Sample description 2', 1,
      'https://www.wandercooks.com/wp-content/uploads/2020/09/easy-onigiri-recipe-1.jpg', '')
  ]
  Items2 : Item[] = [
    new Item(3, 'Baconator', 6.09, 'Sample description 1', 1,
    'https://thewoksoflife.com/wp-content/uploads/2020/04/homemade-chinese-egg-noodles-19-e1609271249794.jpg', ''),
    new Item(4, 'Spicy Nugget', 1.79, 'Sample description 2', 1,
      'https://www.wandercooks.com/wp-content/uploads/2020/09/easy-onigiri-recipe-1.jpg', '')]

  constructor() { }

  getItems(menuId: number) {
    if (menuId == 1) {
      return this.Items1;
    }else{
      return this.Items2;
    }
  }

}
