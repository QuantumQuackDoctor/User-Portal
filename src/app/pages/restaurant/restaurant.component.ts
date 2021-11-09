import {Component, OnInit} from '@angular/core';
import {RestaurantService} from '../../services/restaurant.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../models/Restaurant';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  menuId: number;
  restaurant: Restaurant = {
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
  days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.menuId = this.actRoute.snapshot.params.id;
    this.restaurantService.restaurantSubject.subscribe(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  ngOnInit() {
    this.restaurantService.getRestaurant(this.menuId);
  }
  createRange(length: number): Array<number> {
    return new Array(length);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  encodedAddress() {
    return encodeURIComponent(this.restaurant.address);
  }
}
