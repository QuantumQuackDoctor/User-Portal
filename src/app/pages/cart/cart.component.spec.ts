import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import {HttpClientModule} from "@angular/common/http";

import { window } from "src/app/models/window"

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('checkRequiredFields - delivery or pickup', () =>{
    expect(!component.checkRequiredFields()).toBeTruthy();
    /*expect(window.alert).toHaveBeenCalledOnceWith("Please select delivery of pickup!");*/
  });

  it ('checkRequiredFields - pickup', () =>{
    component.selectedDelivery = 'Pickup';
    expect(component.checkRequiredFields()).toBeTruthy();
  });

  it ('checkRequiredFields - delivery time', () =>{
    component.selectedDelivery = 'Delivery';
    expect(!component.checkRequiredFields()).toBeTruthy();
    /*expect(window.alert).toHaveBeenCalledOnceWith("Please pick a delivery time!");*/
  });

  it ('checkRequiredFields - address', () => {
    component.selectedDelivery = 'Delivery';
    component.selectedTime = '15 Min (Fastest)';
    expect(!component.checkRequiredFields()).toBeTruthy();
    /*expect(window.alert).toHaveBeenCalledOnceWith("Please give a delivery address!");*/
  });

  it ('delivery time tests', () => {
    component.selectedTime = "15 Min (Fastest)";
    expect (component.getDeliveryTime().getTime() ===
      new Date (new Date().getTime() + 15*60000).getTime());
    component.selectedTime = "30 Min";
    expect (component.getDeliveryTime().getTime() ===
      new Date (new Date().getTime() + 30*60000).getTime());
    component.selectedTime = "45 Min";
    expect (component.getDeliveryTime().getTime() ===
      new Date (new Date().getTime() + 45*60000).getTime());
  })

  //TODO: add the place order test
});
