import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentOrdersComponent } from './recent-orders.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RecentOrdersComponent', () => {
  let component: RecentOrdersComponent;
  let fixture: ComponentFixture<RecentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RecentOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
