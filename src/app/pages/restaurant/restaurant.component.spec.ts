import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant.component';
import { RestaurantService } from '../../services/restaurant.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;
  let controller: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        RestaurantService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 1 } } },
        },
      ],
      declarations: [RestaurantComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    controller = TestBed.inject(HttpTestingController);
  });

  it('requests restaurant', () => {
    expect(component).toBeTruthy();

    controller.expectOne('/restaurants/1').flush({
      id: 0,
      name: 'test restaurant',
      search: 'test',
      averageTime: 3,
      averageRating: 5,
      priceRating: 5,
      address: 'address',
      menu: [],
      hours: {
        MON: '',
        TUE: '',
        WED: '',
        THU: '',
        FRI: '',
        SAT: '',
        SUN: '',
      },
      ratings: [],
    });
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('#title'));
    expect(title.nativeElement.innerHTML).toBe('test restaurant'); //restaurant is recieved
  });
});
