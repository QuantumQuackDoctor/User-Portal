import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from 'src/app/models/order/order';
import {KeyValue} from '@angular/common';
import {FoodOrder} from "../../../../models/FoodOrder/food-order";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() orderMap?: KeyValue<number, Order[]>;
/*  orderList: Order[];*/
  @Input () childOrderCounter: number;
  @Output () childOrderCounterChange = new EventEmitter <number>();
  currentDate: Date;

  constructor() {
/*    for (let order of this.orderMap.value){
      if (this.childOrderCounter < 5){
        this.orderList.push (order);
        this.childOrderCounterChange.emit (this.childOrderCounter + 1);
      }else{
        break;
      }this.orderList.reverse();
    }*/
  }

  ngOnInit(): void {
    this.currentDate = new Date(Date.now());
  }

  emitOrder (order: Order): string{
/*    this.childOrderCounter++;*/
    return order?.orderType.toUpperCase();
  }

  printFood(foodOrder: FoodOrder): string {
    let items: string = '';
    if (foodOrder) {
      for (let index = 0; index < foodOrder.items.length; index ++) {
        if (index === foodOrder.items.length - 1){
          items += foodOrder.items[index].name;
        }else{
          items += foodOrder.items[index].name + ', ';
        }
      }
    }
    return items;
  }
}
