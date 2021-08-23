import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { User } from '../models/User';
import {UserProfile} from "../models/user-profile";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userDetails: Subject<User> = new Subject<User>();

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

  updateUser (user: User){
    this.userDetails.next (user);
  }

  updateProfile (userProfile: UserProfile) {
    console.log (userProfile);
    this.http.patch ('/accounts/user', userProfile).subscribe(
      (result: User) => {
        this.userDetails.next(result);
    },
      //TODO log and handle with msgService
    err => {
        console.log (err)
    }
    );
  }

}
