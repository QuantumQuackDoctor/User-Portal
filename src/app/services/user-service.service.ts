import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { User } from '../models/User';
import {UserErrorHandlerService} from "./user-error-handler.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userDetails: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient, private errorHandler: UserErrorHandlerService) {}

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

  updateUser (user: User){
    this.userDetails.next (user);
  }

  updateProfile (updatedUser: User) {
    this.http.patch ('/accounts/user', updatedUser).subscribe(
      (result: User) => {
        console.log (result);
        this.userDetails.next(result);
    },
    err => {
        this.errorHandler.handleError ('updateProfile', updatedUser);
    }
    );
  }

}
