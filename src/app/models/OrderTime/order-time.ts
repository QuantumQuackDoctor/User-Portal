export class OrderTime {
  orderPlaced?: string;
  restaurantAccept?: string;
  restaurantStart?: string;
  restaurantComplete?: string;
  driverAccept?: string;
  delivered?: string;
  deliverySlot?: string;

  constructor(orderPlaced: string, restaurantAccept: string, restaurantStart: string, restaurantComplete: string, driverAccept: string, delivered: string, deliverySlot: string) {
    this.orderPlaced = orderPlaced;
    this.restaurantAccept = restaurantAccept;
    this.restaurantStart = restaurantStart;
    this.restaurantComplete = restaurantComplete;
    this.driverAccept = driverAccept;
    this.delivered = delivered;
    this.deliverySlot = deliverySlot;
  }
}
