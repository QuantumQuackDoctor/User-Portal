export interface User {
  id?: number;
  DOB?: string;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  phone?: string;
  points?: number;
  settings: {
    notifications: {
      email: boolean;
      text: boolean;
    };
    theme: 'dark' | 'light';
  };
}
