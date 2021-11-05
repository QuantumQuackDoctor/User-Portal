import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemComponent } from './restaurant-item.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";

describe('RestaurantItemComponent', () => {
  let component: RestaurantItemComponent;
  let fixture: ComponentFixture<RestaurantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ RestaurantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
