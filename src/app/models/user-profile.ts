export class UserProfile {
  id?: number;
  DOB?: string;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  settings: {
    notifications: {
      email: boolean;
      text: boolean;
    };
    theme: 'dark' | 'light';
  };
}
