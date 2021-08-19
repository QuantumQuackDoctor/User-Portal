import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { FoodOrder } from 'src/app/models/FoodOrder/food-order';
import { Item } from 'src/app/models/item/item';
import { CartService } from 'src/app/services/cart.service';

import { CartDropdownComponent } from './cart-dropdown.component';

describe('CartDropdownComponent', () => {
  let component: CartDropdownComponent;
  let fixture: ComponentFixture<CartDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule],
      declarations: [CartDropdownComponent],
      providers: [
        {
          provide: CartService,
          useValue: {
            cartSubject: of([
              new FoodOrder(1, 'name', [
                new Item(1, 'item', 0, 'description', 2, '', []),
                new Item(1, 'item', 0, 'description', 2, '', []),
              ]),
              new FoodOrder(1, 'name', [
                new Item(1, 'item', 0, 'description', 2, '', []),
              ]),
            ]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart data', () => {
    let container = fixture.debugElement.query(By.css('.container-fluid'));
    //container should have three rows, one for each restaurant (2 total) and one for the submit button
    expect(container.children.length).toBe(3);
    //row 0 should have two children, one for each order item
    expect(container.children[0].children.length).toBe(2);
    //check that item name and quantity are displayed, I really don't know how to get specific elements in angular, this requires the same html knowledge as By.css to understand
    expect(
      container.children[0].children[0].children[0].nativeElement.innerText
    ).toContain('item x 2');
  });
});
