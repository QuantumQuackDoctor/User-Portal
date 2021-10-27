import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTokenComponent} from './create-token.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxStripeModule, StripeCardComponent, StripeService} from "ngx-stripe";
import {HttpClientModule} from "@angular/common/http";

describe('CreateTokenComponent', () => {
  let component: CreateTokenComponent;
  let fixture: ComponentFixture<CreateTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule, NgxStripeModule.forRoot('pk_test_51JUCrpATHQZZA29u2Z9T83a5jPQIPVHCa0wooyuyiaj561uWh4iNt9ZhocS0nSPWTft9rCbksrjq3Dk8pqKSLad100ZrRTjE9z')],
      providers: [StripeService],
      declarations: [CreateTokenComponent, StripeCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
