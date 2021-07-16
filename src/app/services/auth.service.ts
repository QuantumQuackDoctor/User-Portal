import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../models/Authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    //set base url
    if (!environment.production) {
      this.baseUrl = 'http://localhost:8080';
    } else {
      this.baseUrl = 'server url'; //TODO add server url when setup
    }

    this.testAuthentication();
  }

  /**
   * Authentication wrapped in promise, this is because the auth service
   * itself holds authentication data, not the components that call it.
   * Promise is resolved or rejected depending on authentication status
   * @param authRequest authentication data
   * @returns promise that is resolved upon successful authentication
   */
  authenticate(authRequest: AuthRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http
        .post<AuthResponse>(
          this.baseUrl + '/accounts/login',
          authRequest,
          this.httpOptions
        )
        .subscribe(
          (response) => {
            this.setJwt(response.jwt);
            resolve('authentication successful');
          },
          (error) => {
            switch (error.status) {
              case 0:
                reject('client error');
                break;
              case 401:
                reject('Authorization failed');
                break;
              default:
                reject('Error not handled');
            }
          }
        );
    });
  }

  addAuthenticationToHeaders(headers: HttpHeaders): HttpHeaders {
    if (localStorage.getItem('jwt') === undefined) {
      throw new NotAuthenticatedError('User not authenticated');
    }
    return headers.append('Authorization', `Bearer ${this.getJwt()}`);
  }

  private setJwt(jwt: string | undefined) {
    if (jwt === undefined) {
      localStorage.removeItem('jwt');
    } else {
      localStorage.setItem('jwt', jwt);
    }
  }

  getAuthenticationHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.getJwt()}` });
  }

  getJwt(): string | undefined {
    let jwt = localStorage.getItem('jwt');
    return jwt !== null ? jwt : undefined;
  }

  /**
   * Loose authentication check, does not check for session expiration
   * @returns true if authenticated
   */
  isAuthenticated(): boolean {
    return this.getJwt() !== undefined;
  }

  /**
   * Tests authentication with server, if it fails authservice data is reset and the returned promise is rejected
   * @returns promise, resolved if authentication is valid
   */
  testAuthentication(): Promise<void> {
    if (this.getJwt() === undefined) {
      return Promise.reject(new NotAuthenticatedError("Jwt doesn't exists"));
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseUrl + '/accounts/authenticated', {
          headers: this.addAuthenticationToHeaders(new HttpHeaders()),
          observe: 'response',
        })
        .subscribe((response) => {
          if (response.status === 200) {
            resolve();
          } else {
            this.setJwt(undefined);
            reject();
          }
        });
    });
  }
}

export class NotAuthenticatedError extends Error {
  constructor(m: string) {
    super(m);
  }
}
