export class OrderTime {
  orderPlaced?: string;
  restaurantAccept?: Date;
  restaurantStart?: string;
  restaurantComplete?: string;
  driverAccept?: string;
  delivered?: number;
  deliverySlot?: Date;

  constructor(orderPlaced: string, restaurantAccept: Date, restaurantStart: string, restaurantComplete: string, driverAccept: string, delivered: number, deliverySlot: Date) {
    this.orderPlaced = orderPlaced;
    this.restaurantAccept = restaurantAccept;
    this.restaurantStart = restaurantStart;
    this.restaurantComplete = restaurantComplete;
    this.driverAccept = driverAccept;
    this.delivered = delivered;
    this.deliverySlot = deliverySlot;
  }
}
