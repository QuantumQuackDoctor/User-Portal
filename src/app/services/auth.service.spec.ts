import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
  });

  it('can send login', inject(
    [HttpTestingController, AuthService],
    (httpMock: HttpTestingController, authService: AuthService) => {
      let credentials = {
        email: 'email@example.com',
        password: 'password',
        isDriver: false,
      };
      authService.login(credentials).subscribe(() => {
        console.log('please');
      });

      const mockReq = httpMock.expectOne(authService.url + '/accounts/login');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('POST');
    }
  ));
});
