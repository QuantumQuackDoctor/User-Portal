import { Component, Input } from '@angular/core';
import { Order } from '../../../../models/order/order';
import { FoodOrder } from '../../../../models/FoodOrder/food-order';
import { OrderService } from '../../../../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../../../services/cart.service';
import { RestaurantService } from '../../../../services/restaurant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recent-order',
  templateUrl: './recent-order.component.html',
  styleUrls: ['./recent-order.component.css'],
})
export class RecentOrderComponent {
  @Input() order: Order;
  faPen = faPen;
  orderNotes: FormGroup;

  constructor(
    private orderService: OrderService,
    private modalService: NgbModal,
    private cartService: CartService,
    private restaurantService: RestaurantService
  ) {
    this.orderNotes = new FormGroup({
      driverNote: new FormControl(this.order?.driverNote, Validators.required),
      restaurantNote: new FormControl(
        this.order?.restaurantNote,
        Validators.required
      ),
    });
    this.orderNotes.disable();
  }

  cancelOrder() {
    this.orderService.cancelOrder(this.order);
    this.orderService.getOrders();
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  toggleNoteInput() {
    this.orderNotes.updateValueAndValidity();
    if (this.orderNotes.disabled) {
      this.orderNotes.enable();
    } else {
      this.orderNotes.disable();
    }
  }

  checkDeliverySlot(slot: Date): boolean {
    if (slot == null) {
      return false;
    }
    let timeSlot: Date = new Date(slot);
    let currentTime: Date = new Date();
    return (timeSlot.getTime() - currentTime.getTime()) / (1000 * 60) > 10;
  }

  reOrder() {
    for (let foodOrder of this.order.food) {
      this.restaurantService
        .getRestaurant(foodOrder.restaurantId)
        .subscribe((restaurant) => {
          for (let item of foodOrder.items) {
            this.cartService.addToCart(
              restaurant.menu.find((element) => element.id == item.id),
              foodOrder.restaurantId
            );
          }
        });
    }
  }

  orderDetails(content) {
    this.modalService.open(content, { centered: true });
  }

  printFood(foodOrder: FoodOrder): string {
    return this.orderService.printFood(foodOrder);
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
