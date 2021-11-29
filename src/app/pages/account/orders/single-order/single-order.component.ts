import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {OrderService} from "../../../../services/order.service";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {CartService} from "../../../../services/cart.service";
import {NgbModal, NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {RestaurantService} from "../../../../services/restaurant.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faPen, faStar} from '@fortawesome/free-solid-svg-icons';
import {Restaurant, RestaurantReview} from "../../../../models/Restaurant";

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent {

  @Input() order: Order
  faPen = faPen;
  faStar = faStar;
  orderNotes: FormGroup;
  reviewForm: FormGroup;
  currentStars: number = 0;
  foodOrderCursor: FoodOrder;

  restaurants: Restaurant[] = [];

  constructor(private orderService: OrderService, private cartService: CartService, private modalService: NgbModal,
              private restaurantService: RestaurantService, config: NgbRatingConfig) {
    this.restaurantService.restaurantSubject.subscribe((restaurant: Restaurant) => {
      this.restaurants.push(restaurant);
    });
    this.orderNotes = new FormGroup({
      driverNote: new FormControl(this.order?.driverNote, Validators.required),
      restaurantNote: new FormControl(this.order?.restaurantNote, Validators.required)
    });
    this.orderNotes.disable();
    this.reviewForm = new FormGroup(({
      reviewBody: new FormControl("", Validators.required),
    }));
    this.reviewForm.enable();
    config.max = 5;
  }


  cancelOrder() {
    this.orderService.cancelOrder(this.order);
    location.reload();
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  submitReview() {
    this.reviewForm.updateValueAndValidity();
    let formValues = this.reviewForm.value;
    let review: RestaurantReview = {
      description: formValues.reviewBody,
      stars: this.currentStars,
      imageURL: '',
      restaurant: this.foodOrderCursor.restaurantId
    }

    this.restaurantService.submitReview(review);

  }

  openModal(content) {
    this.modalService.open(content, {centered: true})
  }

  printFood(foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
  }

  checkDeliverySlot(slot: Date): boolean {
    if (slot == null) {
      return false;
    }
    let timeSlot: Date = new Date(slot);
    let currentTime: Date = new Date();
    return ((timeSlot.getTime() - currentTime.getTime()) / (1000 * 60)) > 10;
  }

  orderDetails(content) {
    if (this.restaurants.length === 0){
      for (let foodOrder of this.order.food) {
        this.restaurantService.getRestaurant(foodOrder.restaurantId);
      }
    }
    this.modalService.open(content, {centered: true})
  }

  reOrder() {
    for (let foodOrder of this.order.food) {
      for (let item of foodOrder.items) {
        this.cartService.addToCart(item, foodOrder.restaurantId);
      }
    }
  }

  toggleNoteInput() {
    this.orderNotes.updateValueAndValidity();
    if (this.orderNotes.disabled) {
      this.orderNotes.enable();
    } else {
      this.orderNotes.disable();
    }
  }

  submitNoteUpdate() {
    //Update Order with notes;
    this.orderNotes.updateValueAndValidity();
    let formValues = this.orderNotes.value;
    let updatedOrder: Order = this.order;
    updatedOrder.driverNote = formValues.driverNote;
    updatedOrder.restaurantNote = formValues.restaurantNote;

    this.orderService.updateOrderDetail(updatedOrder);
    location.reload();
  }
}
