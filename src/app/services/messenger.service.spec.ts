import { TestBed } from '@angular/core/testing';

import { MessengerService } from './messenger.service';
import {HttpClientModule} from "@angular/common/http";

describe('MessengerService', () => {
  let service: MessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ("Catch the message being emitted", () => {
    let spyObj = spyOn(service.getMsg(), 'subscribe');
  });
});
