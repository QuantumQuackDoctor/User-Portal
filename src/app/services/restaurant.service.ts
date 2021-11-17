import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Restaurant} from '../models/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  restaurantSubject: Subject<Restaurant> = new Subject<Restaurant>()

  hours = {
    MON: '11:00AM-11:00PM',

    TUE: '11:00AM-11:00PM',

    WED: '11:00AM-11:00PM',

    THU: '11:00AM-11:00PM',

    FRI: '11:00AM-11:00PM',

    SAT: '11:00AM-11:00PM',

    SUN: '11:00AM-11:00PM',

  }

  constructor(private http: HttpClient) {}

  getRestaurant(id) {
    this.http.get<Restaurant>(environment.baseURL + `/restaurants/${id}`)
      .subscribe((restaurant) => {
        if (!restaurant.hours)
          restaurant.hours = this.hours;
        this.restaurantSubject.next(restaurant);
      });
  }
}
