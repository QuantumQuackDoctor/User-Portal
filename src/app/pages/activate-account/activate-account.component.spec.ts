import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { ActivateAccountComponent } from './activate-account.component';

describe('ActivateAccountComponent', () => {
  let component: ActivateAccountComponent;
  let fixture: ComponentFixture<ActivateAccountComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: { params: of({ token: 'token' }) },
        },
      ],
      declarations: [ActivateAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateAccountComponent);
    http = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send activation request on init', () => {
    http.expectOne('http://localhost:4200/accounts/activate/token').flush('');
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toBe('Activation Successful');
  });

  it('should display expired on 410', () => {
    http
      .expectOne('http://localhost:4200/accounts/activate/token')
      .flush('', { status: 410, statusText: 'not found' });

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toContain('expired');
  });

  it('should display not found on 404', () => {
    http
      .expectOne('http://localhost:4200/accounts/activate/token')
      .flush('', { status: 404, statusText: 'not found' });

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toContain('not found');
  });

  it('should display server error default', () => {
    http
      .expectOne('http://localhost:4200/accounts/activate/token')
      .flush('', { status: 0, statusText: 'not found' });

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerText
    ).toContain('server error');
  });
});
