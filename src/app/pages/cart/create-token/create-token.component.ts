import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {OrderService} from "../../../services/order.service";

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css']
})
export class CreateTokenComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  paymentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private stripeService: StripeService, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      name: ['PaymentToken', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.paymentForm.get('name').value;
    this.stripeService.createToken(this.card.element, {name})
      .subscribe(
        result => {
          if (result.token) {
            this.orderService.processPayment(result.token.id)
            /*console.log(result.token);*/
          } else if (result.error) {
            console.log(result.error.message);
          }
        }
      );
  }
}
