import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../models/item/item";
import {MessengerService} from "../../../services/messenger.service";

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {

  @Input() menuItem : Item

  constructor(private msgService : MessengerService) { }

  ngOnInit(): void {
  }

  handleAddToCart (){
    this.msgService.sendMsg(this.menuItem)
  }
}
