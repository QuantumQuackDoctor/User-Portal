import { Injectable } from '@angular/core';
import {Item} from "../models/item/item";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  Items1 : Item[] = [
    new Item(1, 'Big Mac', 5.3, 'Sample description 1', 1,
      'https://s.yimg.com/ny/api/res/1.2/9nfLT8nhPkXbWNtXYsdMVA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTY0MA--/https://s.yimg.com/uu/api/res/1.2/1ObWdUc408dH9pEqlHDz9w--~B/aD00MDA7dz00MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/cnwgroup.com/de8c4e116bbb6c1266676bd2c967bb28', []),
    new Item(2, '20 Pc McNuggets', 5.78, 'Sample description 2', 1,
      'https://www.mcdonalds.com/content/dam/ca/nfl/web/nutrition/products/tile/en/mcdonalds-20-chicken-mcnuggets.jpg', [])
  ]
  Items2 : Item[] = [
    new Item(3, 'Baconator', 6.09, 'Sample description 1', 1,
    'https://asouthernfairytale.com/wp-content/uploads/2016/08/Make-Your-own-Wendys-Baconator-1-1-720x720.jpg', []),
    new Item(4, 'Spicy Nugget', 1.79, 'Sample description 2', 1,
      'https://fastfoodnutrition.org/item-photos/400x400/5599.jpg', [])]

  constructor() { }

  getItems(menuId: number) {
    if (menuId == 1) {
      return this.Items2;
    }else{
      return this.Items1;
    }
  }

}
