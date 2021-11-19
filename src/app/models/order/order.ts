import {OrderTime} from '../OrderTime/order-time';
import {FoodOrder} from '../FoodOrder/food-order'
import {Price} from 'src/app/models/price/price'

export class Order {
    id?: number;
    orderType?: string;
    driverID?: number;
    address?: string;
    orderTime?: OrderTime;
    refunded?: boolean;
    price?: Price;
    food?: FoodOrder[];
    driverNote?: string;
    restaurantNote?: string;

    constructor(id: number, orderType: string, driverID: number, address: string, orderTime: OrderTime, refunded: boolean, price: Price, food: FoodOrder[]) {
        this.id = id;
        this.orderType = orderType;
        this.driverID = driverID;
        this.address = address;
        this.orderTime = orderTime;
        this.refunded = refunded;
        this.price = price;
        this.food = food;
    }
}
