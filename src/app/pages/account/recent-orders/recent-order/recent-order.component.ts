import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {OrderService} from "../../../../services/order.service";
import {NgbModal, NgbRatingConfig} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../../../../services/cart.service";
import {RestaurantService} from "../../../../services/restaurant.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faPen, faStar} from '@fortawesome/free-solid-svg-icons';
import {Restaurant} from "../../../../models/Restaurant";

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css'],
  providers: [NgbRatingConfig],
  styles: [`
    .filled {
        color: #F79E02
    }
  `]
})
export class RecentOrderComponent {

  @Input() order: Order;
  faPen = faPen;
  faStar = faStar;
  orderNotes: FormGroup;
  reviewForm: FormGroup;

  restaurants: Restaurant[]

  constructor(private orderService: OrderService,
              private modalService: NgbModal,
              private cartService: CartService,
              private restaurantService: RestaurantService,
              config: NgbRatingConfig) {
    this.orderNotes = new FormGroup({
      driverNote: new FormControl(this.order?.driverNote, Validators.required),
      restaurantNote: new FormControl(this.order?.restaurantNote, Validators.required)
    });
    this.orderNotes.disable();
    this.restaurantService.restaurantSubject.subscribe((restaurant:Restaurant) => {
      this.restaurants.push (restaurant);
    });
    this.reviewForm = new FormGroup(({
      reviewBody: new FormControl("", Validators.required)
    }));
    this.reviewForm.enable();
    config.max = 5;
  }


  cancelOrder(){
    this.orderService.cancelOrder (this.order);
    location.reload();
  }

  closeModals(){
    this.modalService.dismissAll();
  }

  toggleNoteInput (){
    this.orderNotes.updateValueAndValidity();
    if (this.orderNotes.disabled){
      this.orderNotes.enable();
    }else{
      this.orderNotes.disable();
    }
  }

  checkDeliverySlot (slot: Date): boolean{
    if (slot == null){
      return false;
    }
    let timeSlot: Date = new Date (slot);
    let currentTime: Date = new Date ();
    return ((timeSlot.getTime() - currentTime.getTime()) / (1000 * 60)) > 10;
  }

  reOrder() {
    for (let foodOrder of this.order.food) {
      for (let item of foodOrder.items) {
        this.cartService.addToCart(item, foodOrder.restaurantId);
      }
    }
  }

  openModal(content) {
    this.modalService.open(content, {centered: true})
  }

  printFood(foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
  }

  submitNoteUpdate (){
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
