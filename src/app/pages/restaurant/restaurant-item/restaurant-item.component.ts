import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../models/item/item';
import { CartService } from '../../../services/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css'],
})
export class RestaurantItemComponent implements OnInit {
  @Input() menuItem: Item;
  menuId: number;

  constructor(
    private cartService: CartService,
    private actRoute: ActivatedRoute
  ) {
    this.menuId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {}

  handleAddToCart() {
    this.menuItem.quantity = 1;
    this.cartService.addToCart(this.menuItem, this.menuId);
  }
}
