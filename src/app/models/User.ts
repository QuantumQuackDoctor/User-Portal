export interface User {
  id?: number;
  DOB?: string;
  isVeteran?: boolean;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  phone?: string;
  points?: number;
  orders?: number[];
  settings: {
    notifications: {
      email: boolean;
      emailOrder: boolean;
      emailDelivery: boolean;
      text: boolean;
    };
    theme: 'dark' | 'light';
  };
}
