export class Item {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number = 0;
  imgURL?: string;
  configurations: string[];

  constructor(
    id: number,
    name: string,
    price: number,
    description: string,
    quantity: number,
    imgURL: string,
    configurations: string[]
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.imgURL = imgURL;
    this.configurations = configurations;
  }
}
