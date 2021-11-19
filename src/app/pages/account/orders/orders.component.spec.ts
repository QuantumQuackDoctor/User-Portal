import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersComponent} from './orders.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Order} from "../../../models/order/order";
import {OrderTime} from "../../../models/OrderTime/order-time";
import {NgxPaginationModule} from "ngx-pagination";
import {OrderFilterPipe} from "../../../pipes/order-filter.pipe";

function sampleOrderList(orderList: Order[], month: number) : Order[] {

  if (month === 0) return orderList;
  let restaurantAccept = new Date (Date.now());
  restaurantAccept.setMonth(month);
  let orderTime = new OrderTime (null, restaurantAccept, null ,null, null, null, null);
  let order = new Order (null, null, null, null, orderTime, null, null, null);
  orderList.push (order);
  return sampleOrderList(orderList, month - 1);

}

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxPaginationModule],
      providers: [],
      declarations: [OrdersComponent, OrderFilterPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
