import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SingleOrderComponent} from './single-order.component';
import {CartService} from "../../../../services/cart.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Item} from "../../../../models/item/item";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";

describe('SingleOrderComponent', () => {
  let component: SingleOrderComponent;
  let fixture: ComponentFixture<SingleOrderComponent>;
  let spy = jasmine.createSpyObj('CartService', ['addToCart']);
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: CartService, useValue: spy}],
      declarations: [SingleOrderComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOrderComponent);
    component = fixture.componentInstance;
    let item: Item = {
      configurations: [],
      description: "",
      name: "",
      price: 0,
      quantity: 0,
      id: 1
    }
    let items: Item[] = [item]
    let foodOrders: FoodOrder[] = [{
      items: items,
      restaurantId: 1,
    }];
    component.order = {
      orderType: "Delivery",
      food: foodOrders,
      orderTime: {
        delivered: null,
      },
    }

    fixture.detectChanges();
    });

  afterEach(() => {
    component = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call cartService add cart', () => {
    component.reOrder();
    expect(spy.addToCart).toHaveBeenCalled();
  });

});
