import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService, AuthToken } from 'src/app/services/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAuthService = jasmine.createSpyObj('AuthService', [
    'authenticationStatus',
  ]);
  let statusSubject = (mockAuthService.authenticationStatus =
    new BehaviorSubject<AuthToken>({ valid: true }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo', async () => {
    await fixture.whenStable();
    const logo = fixture.debugElement.query(By.css('.header-logo'));
    expect(logo).toBeTruthy();
  });

  it('can display sign in', async () => {
    statusSubject.next({ valid: false });
    fixture.detectChanges();
    await fixture.whenStable();
    const signInButton = fixture.debugElement.query(By.css('.login'));
    expect(signInButton).toBeTruthy();
  });

  it('can display account icon', async () => {
    statusSubject.next({ valid: true });
    fixture.detectChanges();
    await fixture.whenStable();
    const accountIcon = fixture.debugElement.query(By.css('.account'));
    expect(accountIcon).toBeTruthy();
  });
});
