import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-restaurant-display',
  templateUrl: './restaurant-display.component.html',
  styleUrls: ['./restaurant-display.component.css'],
})
export class RestaurantDisplayComponent {
  @Input() restaurant: Restaurant = {
    id: 1,
    name: 'Restaurant',
    iconId: '2',
    backgroundId: '2',
    averageTime: 10,
    averageRating: 5,
    priceRating: 4,
    address: 'address',
    hours: {
      MON: '',
      TUE: '',
      WED: '',
      THU: '',
      FRI: '',
      SAT: '',
      SUN: '',
    },
    search: 'restaurant',
    menu: [],
    ratings: [],
  };
  iconImage = null;

  constructor() {
  }
}
