import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });
  });

  it('search restaurants', inject(
    [HttpTestingController, SearchService],
    (httpMock: HttpTestingController, searchService: SearchService) => {
      searchService.searchRestaurants().subscribe(() => {
        console.log('generic search');
      });

      const mockReq = httpMock.expectOne(
        searchService.url +
          '/restaurants/search?search=&geolocation=&sort_type=&sort_values=&stars=0&price=5&page=0&size=10'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('GET');
    }
  ));
});
