import { Item } from '../item/item';

export class FoodOrder {

  restaurantId? : string;
  items? : Item[];

  constructor(restaurantId: string, items: Item[]) {
    this.restaurantId = restaurantId;
    this.items = items;
  }
}
