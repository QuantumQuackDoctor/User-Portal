import {Component, OnInit} from '@angular/core';
import {Item} from "../../models/item/item";
import {RestaurantService} from "../../services/restaurant.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  menuItems: Item[] = [];
  menuId : number;

  constructor(private restaurantService: RestaurantService,
              private actRoute: ActivatedRoute) {
    this.menuId = this.actRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.menuItems = this.restaurantService.getItems(this.menuId);
  }
}
