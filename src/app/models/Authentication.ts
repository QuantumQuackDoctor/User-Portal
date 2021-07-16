export interface AuthRequest {
  email: string;
  password: string;
  isDriver: boolean;
}

export interface AuthResponse {
  jwt: string;
}
