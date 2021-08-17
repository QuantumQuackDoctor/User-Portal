import {Order} from "./order/order";

export interface User {
  id?: number;
  DOB?: string;
  veteranStatus?: boolean;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  phone?: string;
  points?: number;
  orders?: Order[];
  settings: {
    notifications: {
      email: boolean;
      text: boolean;
    };
    theme: 'dark' | 'light';
  };
}
