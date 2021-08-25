import {ErrorHandler, Injectable} from '@angular/core';
import {MessengerService} from "./messenger.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserErrorHandlerService extends ErrorHandler{

  constructor(private msgService: MessengerService) {
    super();
  }

  /**
   * Handle errors
   * Allows the app to continue
   */
  public handleError<T>(operation = 'operation', fallbackValue?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed : ${error.message}`);
      this.msgService.log(`${operation} failed : ${error.message}`);

      return of(fallbackValue as T);
    }
  }
}
