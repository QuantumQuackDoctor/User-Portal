import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDisplayComponent } from './restaurant-display.component';

describe('RestaurantDisplayComponent', () => {
  let component: RestaurantDisplayComponent;
  let fixture: ComponentFixture<RestaurantDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
