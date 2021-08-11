import { Component, OnInit, Inject } from '@angular/core';
import {faBars} from "@fortawesome/free-solid-svg-icons";

import {Sort} from '@angular/material/sort';
import {SearchService} from "../../services/search.service";
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from "@angular/material/dialog";


export interface Hours {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface Restaurant {
  id: number;
  name: string;
  iconId: string;
  backgroundId: string;
  averageTime: number;
  averageRating: number;
  priceRating: number;
  address: string;
  hours: Hours;
  search: string;
  menu: string;
  ratings: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  menuIcon = faBars;
  displayedColumns: string[] = ['image', 'name', 'rating', 'price', 'timeToDeliver'];
  searchResults: Restaurant[];
  output: string;
  selectedPageSize: 10;

  constructor(private searchService: SearchService, public dialog: MatDialog) {
    // this.searchResults = this.EXAMPLE_DATA.slice();
    this.searchResults = [];
    this.output = "";
  }

  sortData(sort: Sort) {

    const data = this.searchResults;
    const isAsc = sort.direction === 'asc';
    if (!sort.active || sort.direction === '') {
      this.searchResults = data;
      return;
    }

    switch (sort.active) {
      case 'name':
        this.searchService.searchRestaurants().subscribe(
          (res) => {
            this.searchResults = res;
          }
        );
        break;
      case 'rating':
        this.searchService.sortType = 'stars';
        this.searchService.sortValue = (isAsc ? 'low' : 'high');

        break;
      case 'price':
        this.searchService.sortType = 'price';
        this.searchService.sortValue = (isAsc ? 'low' : 'high');

        break;
    }
  }

  open(restaurant: Restaurant) {
    restaurant.name = "thing";
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

  changePaging() {
    this.searchService.size = this.selectedPageSize;
  }

  filterRating(event: any) {
    this.searchService.stars = event.value;
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
    this.dialog.open(RestaurantDialog, {
      data: {
        id: restaurant.id,
        name: restaurant.name,
        iconId: restaurant.iconId,
        backgroundId: restaurant.backgroundId,
        averageTime: restaurant.averageTime,
        averageRating: restaurant.averageRating,
        priceRating: restaurant.priceRating,
        address: restaurant.address,
        hours: {
          mon: restaurant.hours.mon,
          tue: restaurant.hours.tue,
          wed: restaurant.hours.wed,
          thu: restaurant.hours.thu,
          fri: restaurant.hours.fri,
          sat: restaurant.hours.sat,
          sun: restaurant.hours.sun,
        },
        search: restaurant.search,
        menu: restaurant.menu,
        ratings: restaurant.ratings,
      }
    });
  }

  ngOnInit(): void {

  }
}


@Component({
  selector: 'restaurant-dialog',
  templateUrl: 'restaurant.dialog.html',
  styleUrls: ['./restaurant.dialog.css']
})
export class RestaurantDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Restaurant) {}
}
