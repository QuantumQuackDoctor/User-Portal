import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import {Item} from "../../../../models/item/item";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {Order} from "../../../../models/order/order";

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('print order items', () => {
    let item1 = new Item (null, 'big mac',
      null, null, null, null, null);
    let item2 = new Item (null, 'nuggets',
      null, null, null, null, null);
    let items: Item[] = [];
    items.push (item1);
    items.push (item2);
    let foodOrder = new FoodOrder (null, 'test restaurant', items);
    let food = [foodOrder];
    let order = new Order(null, null, null, null, null, null, null, food);
    expect (component.printFood (order)).toBe ('test restaurant: big mac, nuggets, ' + '\n');
  })
});
