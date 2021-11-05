import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item/item';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getRestaurant(id): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      environment.baseURL + `/restaurants/${id}`
    );
  }
}
