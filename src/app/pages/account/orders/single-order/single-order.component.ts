import {Component, Input} from '@angular/core';
import {Order} from "../../../../models/order/order";
import {OrderService} from "../../../../services/order.service";
import {FoodOrder} from "../../../../models/FoodOrder/food-order";
import {CartService} from "../../../../services/cart.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RestaurantService} from "../../../../services/restaurant.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent {

  @Input() order: Order
  faPen = faPen;
  orderNotes: FormGroup;

  constructor(private orderService: OrderService, private cartService: CartService, private modalService: NgbModal,
              private restaurantService: RestaurantService) {
    this.orderNotes = new FormGroup({
      driverNote: new FormControl(this.order?.driverNote, Validators.required),
      restaurantNote: new FormControl(this.order?.restaurantNote, Validators.required)
    });
    this.orderNotes.disable();
  }

  cancelOrder(){
    this.orderService.cancelOrder (this.order);
    this.orderService.getOrders();
  }

  closeModals(){
    this.modalService.dismissAll();
  }

  printFood (foodOrder: FoodOrder): string{
    return this.orderService.printFood(foodOrder);
  }

  checkDeliverySlot (slot: Date): boolean{
    if (slot == null){
      return false;
    }
    let timeSlot: Date = new Date (slot);
    let currentTime: Date = new Date ();
    return ((timeSlot.getTime() - currentTime.getTime()) / (1000 * 60)) > 10;
  }

  orderDetails(content) {
    this.modalService.open(content, {centered: true})
    console.log (this.order);
  }

  reOrder (){
    for (let foodOrder of this.order.food) {
      for (let item of foodOrder.items){
        this.cartService.addToCart(this.restaurantService.getItems(foodOrder.restaurantId)
            .find (element => element.id == item.id),
          foodOrder.restaurantId);
      }
    }
  }

  toggleNoteInput (){
    this.orderNotes.updateValueAndValidity();
    if (this.orderNotes.disabled){
      this.orderNotes.enable();
    }else{
      this.orderNotes.disable();
    }
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
