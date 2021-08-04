import { Component, OnInit } from '@angular/core';
import {Item} from "../../models/item/item";
import {RestaurantService} from "../../services/restaurant.service";
import {MessengerService} from "../../services/messenger.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  menuItems : Item[] = []

  constructor(private restaurantService : RestaurantService, private msgService : MessengerService,
              private cartService : CartService) { }

  ngOnInit() {
    this.menuItems = this.restaurantService.getItems();
  }
}
