export class Item {

  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  imgURL?: string;
  configuration: string;

  constructor(id: number, name: string, price: number, description: string, quantity: number, imgURL: string,
    configuration: string) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.imgURL = imgURL;
    this.configuration = configuration;
  }
}
