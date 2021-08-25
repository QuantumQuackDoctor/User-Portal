import { TestBed } from '@angular/core/testing';

import { UserErrorHandlerService } from './user-error-handler.service';

describe('UserErrorHandlerService', () => {
  let service: UserErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
