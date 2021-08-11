import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RestaurantComponent} from './restaurant.component';
import {RestaurantService} from "../../services/restaurant.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RestaurantService],
      declarations: [RestaurantComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
