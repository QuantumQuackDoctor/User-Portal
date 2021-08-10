import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/order/order";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() orderMap? : KeyValue <number, Order[]>;
  currentDate : Date;
  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date (Date.now());
  }

  printFood (order: Order): string{
    let items: string = '';
    for (let foodOrder of order.food){
      items += foodOrder.restaurantName + ': ';
      for (let item of foodOrder.items){
        items += item.name + ', ';
      }
      items += '\n';
    }
    return items;
  }

/*  isPending (date : Date) : boolean{
    let compareDate = new Date (date);
    console.log (compareDate);
    console.log ("current: " + this.currentDate);
    return compareDate > this.currentDate;
  }*/

}
