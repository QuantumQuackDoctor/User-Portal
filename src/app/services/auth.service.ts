import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../models/Authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    if (!environment.production) {
      this.baseUrl = 'http://localhost:8080';
    } else {
      this.baseUrl = 'server url'; //TODO add server url when setup
    }
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

  public get currentAuthenticatedUser() {
    return this.currentUser.value;
  }

  public get authenticationStatus() {
    return this.currentUser.asObservable();
  }

  testAuthentication() {
    this.http.get(`${this.baseUrl}/accounts/authenticated`).subscribe(() => {
      console.log('testing');
    });
    //LoginErrorInterceptor handles logout
  }
}
