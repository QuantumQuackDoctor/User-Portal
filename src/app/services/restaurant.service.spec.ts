import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import {HttpClientModule} from "@angular/common/http";
import {MessengerService} from "./messenger.service";

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
