import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserDetails(): Observable<User> {
    return this.http.get<User>('/accounts/user');
  }

  /**
   *  Deletes current user, uses jwt for identification
   * @returns
   */
  public deleteUser(): Observable<string> {
    return this.http.delete('/accounts/user', { responseType: 'text' });
  }
}
