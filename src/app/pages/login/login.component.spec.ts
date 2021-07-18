import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthToken } from 'src/app/services/auth.service';
import { HeaderComponentStub } from 'src/app/shared/header/header.stub';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockNavigate = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockAuthService = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, HeaderComponentStub],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockNavigate },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  it('email field validation', () => {
    let email = component.loginGroup.get('email');
    email?.setValue('invalid');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeFalse();

    email?.setValue('validEmail@example.com');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeTrue();
  });
});
