import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
    }).compileComponents();
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
