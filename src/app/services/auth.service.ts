import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../models/Authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

export interface AuthToken {
  token?: string;
  valid: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private currentUser: BehaviorSubject<AuthToken>;

  constructor(private http: HttpClient) {
    //set base url
    this.baseUrl = environment.baseURL;
    this.currentUser = new BehaviorSubject<AuthToken>(
      JSON.parse(localStorage.getItem('user') || '{"valid": false}')
    );
  }

  /**
   * @param authRequest authentication data
   * @returns promise that is resolved upon successful authentication
   */

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        this.baseUrl + '/accounts/login',
        authRequest,
        this.httpOptions
      )
      .pipe(
        map((authResponse) => {
          let authToken = {
            valid: true,
            token: authResponse.jwt,
          };
          localStorage.setItem('user', JSON.stringify(authToken));
          this.currentUser.next(authToken);
          return authResponse;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next({
      valid: false,
    });
  }

  register(user: User): Observable<string> {
    return this.http.put(this.baseUrl + '/accounts/register', user, {
      headers: this.httpOptions.headers,
      responseType: 'text',
    });
  }

  activateAccount(token: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/accounts/activate/${token}`,
      {},
      { responseType: 'text' }
    );
  }

  public get currentAuthenticatedUser() {
    return this.currentUser.value;
  }

  public get url(): string {
    return this.baseUrl;
  }
  /**
   * Returns observable with authentication status, contains token and boolean flag.
   * Upon subscription it will emit current value, any changes will also be emitted.
   */
  public get authenticationStatus(): Observable<AuthToken> {
    return this.currentUser.asObservable();
  }

  testAuthentication() {
    this.http.get(`${this.baseUrl}/accounts/authenticated`);
    //LoginErrorInterceptor handles logout
  }

  requestReset(email: string) {
    return this.http.get(
      `${this.baseUrl}/accounts/reset-password/user/${email}`
    );
  }

  resetPassword(request: PasswordResetRequest) {
    return this.http.post(`${this.baseUrl}/accounts/reset-password`, request);
  }
}

interface PasswordResetRequest {
  newPassword: string;
  token: string;
}
