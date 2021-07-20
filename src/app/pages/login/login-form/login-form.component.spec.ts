import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRouteStub } from '../../testing-helpers/ActivatedRouteStub';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockNavigate = {
    navigate: jasmine.createSpy('navigate'),
  };
  let httpController: HttpTestingController;
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    returnUrl: '/home',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockNavigate },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    component.loginGroup.updateValueAndValidity();
    expect(component.loginGroup.valid).toBeFalsy();
  });

  it('email field required', () => {
    let email = component.loginGroup.get('email');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeFalsy();

    let errors = email?.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('has correct returnUrl', () => {
    expect(component.returnUrl).toBe('/home');
  });

  it('email field validation', () => {
    let email = component.loginGroup.get('email');
    email?.setValue('invalid');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeFalse();

    email?.setValue('validEmail@example.com');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeTrue();
  });

  it('password required', () => {
    let password = component.loginGroup.get('password');
    password?.updateValueAndValidity();
    expect(password?.valid).toBeFalse();

    password?.setValue('validPassword');
    password?.updateValueAndValidity();
    expect(password?.valid).toBeTrue();
  });

  it('form is bound correctly', async () => {
    let emailText = 'email';
    let passwordText = 'password';
    component.loginGroup.controls['email'].setValue(emailText);
    component.loginGroup.controls['password'].setValue(passwordText);

    fixture.detectChanges();
    await fixture.whenStable();

    const emailInput = fixture.debugElement.query(
      By.css('#email')
    ).nativeElement;
    expect(emailInput.value).toBe(emailText);

    const passwordInput = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    expect(passwordInput.value).toBe(passwordText);
  });

  it('submit sends http request', () => {
    component.loginGroup.controls['email'].setValue('email@example.com');
    component.loginGroup.controls['password'].setValue('password');

    component.onSubmit();

    const req = httpController.expectOne(
      'http://localhost:8080/accounts/login'
    );

    expect(req.request.body.email).toEqual('email@example.com');
    expect(req.request.body.password).toEqual('password');
  });
});
