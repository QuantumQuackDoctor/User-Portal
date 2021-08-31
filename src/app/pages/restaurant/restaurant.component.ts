import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item/item';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  menuId: number;
  @Input() restaurant: Restaurant = {
    id: 0,
    name: '',
    search: '',
    averageTime: 0,
    averageRating: 0,
    priceRating: 0,
    address: '',
    menu: [],
    hours: {
      MON: '',
      TUE: '',
      WED: '',
      THU: '',
      FRI: '',
      SAT: '',
      SUN: '',
    },
    ratings: [],
  };
  starIcon = faStar;
  hours = [];

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute
  ) {
    this.menuId = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.restaurant = this.restaurantService.getRestaurant(this.menuId);
    this.changeHoursToArray();
  }

  private changeHoursToArray() {
    this.hours = [
      {
        day: 'MON',
        hours: this.restaurant.hours.MON,
      },
      {
        day: 'TUE',
        hours: this.restaurant.hours.TUE,
      },
      {
        day: 'WED',
        hours: this.restaurant.hours.WED,
      },
      {
        day: 'THU',
        hours: this.restaurant.hours.THU,
      },
      {
        day: 'FRI',
        hours: this.restaurant.hours.FRI,
      },
      {
        day: 'SAT',
        hours: this.restaurant.hours.SAT,
      },
      {
        day: 'SUN',
        hours: this.restaurant.hours.SUN,
      },
    ];
  }

  createRange(length: number): Array<number> {
    return new Array(length);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  encodedAdress() {
    return encodeURIComponent(this.restaurant.address);
  }
}
