import { Component, OnInit, Inject } from '@angular/core';
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';

import { SearchService } from '../../services/search.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  menuIcon = faBars;
  searchResults: Restaurant[];
  output: string;
  isAsc: boolean = true;
  faStar = faStar;
  currentRatingFilter: number = 1;

  constructor(private searchService: SearchService, public router: Router) {
    // this.searchResults = this.EXAMPLE_DATA.slice();
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
      (err) => {
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
      (err) => {
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
      (err) => {
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

  ngOnInit(): void {}
}
