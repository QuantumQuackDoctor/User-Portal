import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Order} from 'src/app/models/order/order';
import {OrderService} from 'src/app/services/order.service';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth.service";
import {OrderFilterPipe} from "../../../pipes/order-filter.pipe";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class OrdersComponent implements OnInit{
  orderList?: Map<number, Order[]> = new Map();
  fullOrderList: Order[] = [];
  currentMonth: number;
  page: number = 1;
  faSearch = faSearch;
  orderSearch: string = "";

  priceRanges : {
    minPrice: number,
    maxPrice: number
  } [] = [];

    startDate: Date
    endDate: Date

  priceRangeList = [
    {minPrice: 0, maxPrice: 1500},
    {minPrice: 1500, maxPrice: 3000},
    {minPrice: 3000, maxPrice: 4500},
    {minPrice: 4500, maxPrice: null}
  ]

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  constructor(private orderService: OrderService, private authService: AuthService, private _orderFilter: OrderFilterPipe) {
  }

  ngOnInit(): void {
    this.orderService.orderList.subscribe((res) => {
      this.fullOrderList = res.sort((a, b) => {
        let dateA = new Date(a.orderTime.restaurantAccept);
        let dateB = new Date(b.orderTime.restaurantAccept);
        if (dateA.getTime() < dateB.getTime()) {
          return 1;
        } else if (dateA.getTime() > dateB.getTime()) {
          return -1;
        }
        return 0;
      });
      this.currentMonth = new Date(this.fullOrderList[0].orderTime.restaurantAccept).getMonth() + 1;
    });
    this.authService.authenticationStatus.subscribe((status) => {
      if (status.valid) {
        this.orderService.getOrders();
      }
    });
  }

  updateRange (range, event){
    if (this.priceRanges.includes(range) && !event.target.checked) {
      this.priceRanges.splice(this.priceRanges.indexOf(range), 1);
    }else {
      this.priceRanges.push (range);
    }
    console.log (this.priceRanges)
  }

  test (event){
    console.log (event)
  }

  updateStart (event){
    (event) ? this.startDate = new Date (event): this.startDate = undefined;
  }

  updateEnd (event){
    (event) ? this.endDate = new Date (event) : this.endDate = undefined;
  }

  checkMonthChange(order: Order, cursor: number): boolean {
    let month = new Date(order.orderTime.restaurantAccept).getMonth() + 1;
    if (this.currentMonth != month) {
      this.currentMonth = month;
      return true;
    }else return cursor === 0;
  }
}


