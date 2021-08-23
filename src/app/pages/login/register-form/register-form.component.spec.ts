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
import { ActivatedRouteStub } from 'src/app/testing-helpers/ActivatedRouteStub';

import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let mockNavigate = {
    navigate: jasmine.createSpy('navigate'),
  };
  let activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    returnUrl: '/home',
  });
  let httpController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFormComponent],
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
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email bound correctly', async () => {
    const email = component.registerGroup.get('email');

    const input = 'testInput';
    email?.setValue(input);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(By.css('#email')).nativeElement;
    expect(element.value).toEqual(input);
  });

  it('email validation', () => {
    const email = component.registerGroup.get('email');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeFalse();

    email?.setValue('invalidEmail');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeFalse();

    email?.setValue('email@example.com');
    email?.updateValueAndValidity();
    expect(email?.valid).toBeTrue();
  });

  it('password bound correctly', async () => {
    const password = component.registerGroup.get('password');

    const input = 'testInput';
    password?.setValue(input);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(
      By.css('#password')
    ).nativeElement;
    expect(element.value).toEqual(input);
  });

  it('password validation', () => {
    const password = component.registerGroup.get('password');
    password?.updateValueAndValidity(); //password required
    expect(password?.valid).toBeFalse();

    password?.setValue('12345'); //not enough characters
    password?.updateValueAndValidity();
    expect(password?.valid).toBeFalse();

    password?.setValue('12345678'); //at least 8 characters
    password?.updateValueAndValidity();
    expect(password?.valid).toBeTrue();
  });

  it('first name bound correctly', async () => {
    const firstName = component.registerGroup.get('firstName');

    const input = 'testInput';
    firstName?.setValue(input);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(
      By.css('#firstName')
    ).nativeElement;
    expect(element.value).toEqual(input);
  });

  it('first name validation', () => {
    const firstName = component.registerGroup.get('firstName');
    firstName?.updateValueAndValidity();
    expect(firstName?.valid).toBeFalse();

    firstName?.setValue('firstname');
    firstName?.updateValueAndValidity();
    expect(firstName?.valid).toBeTrue();
  });

  it('last name bound correctly', async () => {
    const lastName = component.registerGroup.get('lastName');

    const input = 'testInput';
    lastName?.setValue(input);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(
      By.css('#lastName')
    ).nativeElement;
    expect(element.value).toEqual(input);
  });

  it('phone bound correctly', async () => {
    const phone = component.registerGroup.get('phone');

    const input = 'testInput';
    phone?.setValue(input);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(By.css('#phone')).nativeElement;
    expect(element.value).toEqual(input);
  });

  it('text notifications bound correctly', async () => {
    const textNotifications = component.registerGroup.get('textNotifications');

    textNotifications?.setValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(
      By.css('#textNotifications')
    ).nativeElement;
    expect(element.checked).toEqual(true);
  });

  it('email notifications bound correctly', async () => {
    const emailNotifications =
      component.registerGroup.get('emailNotifications');

    emailNotifications?.setValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.debugElement.query(
      By.css('#emailNotifications')
    ).nativeElement;
    expect(element.checked).toEqual(true);
  });

  it('theme bound correctly', async () => {
    const darkLabel = fixture.debugElement.query(
      By.css('label[for="dark"]')
    ).nativeElement;
    const lightLabel = fixture.debugElement.query(
      By.css('label[for="light"]')
    ).nativeElement;

    const themeControl = component.registerGroup.get('theme');

    darkLabel.click();
    fixture.detectChanges();
    expect(themeControl?.value).toEqual('dark');

    lightLabel.click();
    fixture.detectChanges();
    expect(themeControl?.value).toEqual('light');
  });

  it('sends register', () => {
    component.registerGroup.setValue({
      email: 'email@example.com',
      password: 'password',
      firstName: 'first',
      lastName: 'last',
      phone: '',
      textNotifications: false,
      emailNotifications: true,
      theme: 'dark',
      DOB: '2000-02-08',
      veteranStatus: false,
    });

    component.onSubmit();

    const req = httpController.expectOne(
      'http://localhost:4200/accounts/register'
    );

    const expected = {
      email: 'email@example.com',
      firstName: 'first',
      lastName: 'last',
      password: 'password',
      phone: '',
      settings: {
        notifications: {
          email: true,
          text: false,
        },
        theme: 'dark',
      },
      DOB: '2000-02-08',
      veteranStatus: false,
      orders: [],
    };

    expect(req.request.body).toEqual(expected);

    req.flush('account created');

    expect(mockNavigate.navigate).toHaveBeenCalled();
  });
});
