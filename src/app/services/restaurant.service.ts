import { Injectable } from '@angular/core';
import {Item} from "../models/item/item";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  Items : Item[] = [
    new Item(1, 'Sample Item 1', 5.5, 'Sample description 1', 1,
      'https://thewoksoflife.com/wp-content/uploads/2020/04/homemade-chinese-egg-noodles-19-e1609271249794.jpg', ''),
    new Item(2, 'Sample Item 2', 3.3, 'Sample description 2', 1,
      'https://www.wandercooks.com/wp-content/uploads/2020/09/easy-onigiri-recipe-1.jpg', '')
  ]

  constructor() { }

  getItems() {
    return this.Items;
  }

}
