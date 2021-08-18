import { Item } from '../item/item';

export class FoodOrder {

  restaurantId? : number;
  restaurantName? : string;
  items? : Item[];

  constructor(restaurantId: number, restaurantName: string, items: Item[]) {
    this.restaurantId = restaurantId;
    this.restaurantName = restaurantName;
    this.items = items;
  }
}
