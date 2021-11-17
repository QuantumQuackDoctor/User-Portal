import { Item } from './item/item';

export interface Hours {
  MON: string;
  TUE: string;
  WED: string;
  THU: string;
  FRI: string;
  SAT: string;
  SUN: string;
}

export interface Restaurant {
  id: number;
  name: string;
  iconId?: string;
  backgroundId?: string;
  averageTime: number;
  averageRating: number;
  priceRating: number;
  address: string;
  hours: Hours;
  search: string;
  menu: Array<Item>;
  ratings: Array<RestaurantReview>;
}

export interface RestaurantReview {
  username?: string;
  restaurant?: number;
  imageURL?: string;
  stars?: number;
  description?: string;
}
