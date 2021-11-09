import {Component} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';

import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';
import {Restaurant} from 'src/app/models/Restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {

  searchResults: Restaurant[];
  output: string;
  isAsc: boolean = true;
  faStar = faStar;
  currentRatingFilter: number = 1;

  constructor(private searchService: SearchService, public router: Router) {
    // this.searchResults = this.EXAMPLE_DATA.slice();
    /*this.output = '';*/
    this.searchResults = [
      {
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
      },
      {
        id: 2,
        name: 'Restaurant2',
        iconId: '2',
        backgroundId: '2',
        averageTime: 2,
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
        search: 'tar',
        menu: [],
        ratings: [],
      },
    ];
    this.output = '';
  }

  sortData(sort: string) {
    switch (sort) {
      case 'name':
        this.searchService.searchRestaurants().subscribe((res) => {
          this.searchResults = res;
        });
        break;
      case 'rating':
        this.searchService.sortType = 'stars';
        this.searchService.sortValue = this.isAsc ? 'low' : 'high';

        break;
      case 'price':
        this.searchService.sortType = 'price';
        this.searchService.sortValue = this.isAsc ? 'low' : 'high';

        break;
    }
  }

  toggleAsc() {
    this.isAsc = !this.isAsc;
  }

  open(restaurant: Restaurant) {
    restaurant.name = 'thing';
  }

  reload() {
    this.searchService.searchRestaurants().subscribe(
      (res) => {
        this.searchResults = res;
      },
      () => {
        this.output = this.searchService.search;
      }
    );
  }

  changePaging(size) {
    this.searchService.size = size;
  }

  createRange(num: number) {
    return new Array(num);
  }

  filterRating(rating: number) {
    this.currentRatingFilter = rating;
    this.searchService.stars = rating;
    this.searchService.searchRestaurants().subscribe(
      (res) => {
        this.searchResults = res;
      },
      () => {
        this.output = this.searchService.search;
      }
    );
  }

  filterPrice(event: any) {
    this.searchService.price = event.value;
    this.searchService.searchRestaurants().subscribe(
      (res) => {
        this.searchResults = res;
      },
      () => {
        this.output = this.searchService.search;
      }
    );
  }

  prevPage() {
    if (this.searchService.page > 0) {
      this.searchService.page = this.searchService.page - 1;
    }
  }

  nextPage() {
    this.searchService.page = this.searchService.page + 1;
  }

  getPage(): number {
    return this.searchService.page + 1;
  }

  openRestaurant(restaurant: Restaurant) {
    this.router.navigate([`/restaurant/${restaurant.id}`]);
  }
}
