import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item/item';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface tempReview {
  username: string;
  imageURL: string;
  stars: number;
  description: string;
}
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit {
  menuId: number;
  @Input() restaurant = {
    name: 'Restaurant',
    averageTime: 10,
    rating: 3,
    priceRating: 4,
    address: '3017 Harrison Blvd, Ogden, UT 84403',
    menu: [],
    hours: {
      MON: {
        start: '11:00am',
        end: '11:00pm',
      },
      TUE: {
        start: '11:00am',
        end: '11:00pm',
      },
      WED: {
        start: '11:00am',
        end: '11:00pm',
      },
      THU: {
        start: '11:00am',
        end: '11:00pm',
      },
      FRI: {
        start: '11:00am',
        end: '11:00pm',
      },
      SAT: {
        start: '11:00am',
        end: '11:00pm',
      },
      SUN: {
        start: '11:00am',
        end: '11:00pm',
      },
    },
  };
  starIcon = faStar;
  hours = [];
  restaurantReviews: Array<tempReview> = [
    {
      username: 'username',
      imageURL: '',
      stars: 4,
      description:
        'Deserunt qui qui voluptate quis pariatur enim pariatur cillum consectetur. Enim cillum in velit amet mollit laboris. Mollit sunt consectetur non qui consectetur ipsum pariatur do voluptate non qui commodo ad. Nisi nostrud proident ex aute cupidatat et velit eiusmod.',
    },
    {
      username: 'username2',
      imageURL:
        'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
      stars: 2,
      description:
        'Deserunt qui qui voluptate quis pariatur enim pariatur cillum consectetur. Enim cillum in velit amet mollit laboris. Mollit sunt consectetur non qui consectetur ipsum pariatur do voluptate non qui commodo ad. Nisi nostrud proident ex aute cupidatat et velit eiusmod.',
    },
  ];

  constructor(
    private restaurantService: RestaurantService,
    private actRoute: ActivatedRoute
  ) {
    this.menuId = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.restaurant.menu = this.restaurantService.getItems(this.menuId);
    this.changeHoursToArray();
  }

  private changeHoursToArray() {
    this.hours = [
      {
        day: 'MON',
        start: this.restaurant.hours.MON.start,
        end: this.restaurant.hours.MON.end,
      },
      {
        day: 'TUE',
        start: this.restaurant.hours.TUE.start,
        end: this.restaurant.hours.TUE.end,
      },
      {
        day: 'WED',
        start: this.restaurant.hours.WED.start,
        end: this.restaurant.hours.WED.end,
      },
      {
        day: 'THU',
        start: this.restaurant.hours.THU.start,
        end: this.restaurant.hours.THU.end,
      },
      {
        day: 'FRI',
        start: this.restaurant.hours.FRI.start,
        end: this.restaurant.hours.FRI.end,
      },
      {
        day: 'SAT',
        start: this.restaurant.hours.SAT.start,
        end: this.restaurant.hours.SAT.end,
      },
      {
        day: 'SUN',
        start: this.restaurant.hours.SUN.start,
        end: this.restaurant.hours.SUN.end,
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
