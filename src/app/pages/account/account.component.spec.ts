import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { HeaderComponentStub } from 'src/app/shared/header/header.stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user-service.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AccountComponent without authenticated user', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAuthService = {
    authenticationStatus: of({ valid: false, token: 'token' }),
  };
  let routerspy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AccountComponent],
      providers: [
        HeaderComponentStub,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerspy },
        UserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect', () => {
    fixture.detectChanges();
    expect(routerspy.navigate).toHaveBeenCalled();
  });
});

describe('AccountComponent with authenticated user', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAuthService = {
    authenticationStatus: of({ valid: true, token: 'token' }),
  };
  let routerspy = jasmine.createSpyObj('Router', ['navigate']);
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AccountComponent],
      providers: [
        HeaderComponentStub,
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: routerspy },
        UserService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);

    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get user', () => {
    httpMock.expectOne('/accounts/user').flush({
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      points: 0,
      veteranStatus: true,
    });
    expect(component.user).toBeTruthy();
  });
});
