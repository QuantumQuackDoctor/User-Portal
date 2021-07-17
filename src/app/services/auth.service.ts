import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest, AuthResponse } from '../models/Authentication';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;
  private authennticationSubject = new Subject<boolean>();
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

  /**
   * @returns httpHeaders with authentication populated
   */
  generateAuthenticationHeader(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.getJwt()}` });
  }

  /**
   * adds jwt to local storage
   * @param jwt new jwt
   */
  private setJwt(jwt: string | undefined) {
    if (jwt === undefined) {
      localStorage.removeItem('jwt');
    } else {
      localStorage['jwt'] = jwt;
    }
  }

  /**
   * Retrieves jwt from localStorage, uses undefined instead of null (was to lazy to refactor the other functions that used undefined)
   * @returns Jwt
   */
  getJwt(): string | undefined {
    let jwt = localStorage['jwt'];
    return jwt !== null ? jwt : undefined;
  }

  /**
   * returns subject that will emit an even on any authentication test.
   * This implementation is because on startup the main authentication test is asynchronous,
   * meaning if a component pulls data before the test is over it could be wrong
   * @returns observable tied to authentication status
   */
  getAuthenticationStatus(): Observable<boolean> {
    return this.authennticationSubject.asObservable();
  }

  /**
   * Tests authentication with server, if it fails authservice data is reset and the returned promise is rejected
   * @returns promise, resolved if authentication is valid
   */
  testAuthentication() {
    if (this.getJwt() === undefined) {
      this.authennticationSubject.next(false);
      return;
    }
    this.http
      .get(this.baseUrl + '/accounts/authenticated', {
        headers: this.generateAuthenticationHeader(),
      })
      .subscribe(
        (response) => {
          this.authennticationSubject.next(true);
        },
        (error) => {
          this.setJwt(undefined);
          this.authennticationSubject.next(false);
        }
      );
  }

  /**
   * Re emits previous authentication test
   */
  softTestAuthentication() {
    this.authennticationSubject.next(this.getJwt() !== undefined);
  }
}

export class NotAuthenticatedError extends Error {
  constructor(m: string) {
    super(m);
  }
}
