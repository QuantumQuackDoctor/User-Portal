import {Injectable} from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject = new Subject()
  logs: string [] = []

  constructor() {}

  log(message: string) {
    this.logs.push(message)
  }

  getMsg() {
    return this.subject.asObservable()
  }

}
