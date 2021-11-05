import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly baseUrl: string;
  private _search: string;
  private _geolocation: string;
  private _sortType: string;
  private _sortValue: string;
  private _stars: number;
  private _price: number;
  private _page: number;
  private _size: number;

  constructor(private http: HttpClient) {
    this._search = '';
    this._geolocation = '';
    this._sortType = '';
    this._sortValue = '';
    this._stars = 0;
    this._price = 5;
    this._page = 0;
    this._size = 10;
    this.baseUrl = environment.baseURL;
  }

  searchRestaurants(): Observable<any> {
    let params = new HttpParams()
      .append('search', this._search)
      .append('geolocation', this._geolocation)
      .append('sort_type', this._sortType)
      .append('sort_values', this._sortValue)
      .append('stars', this._stars)
      .append('price', this._price)
      .append('page', this._page)
      .append('size', this._size);

    return this.http.get(this.baseUrl + `/restaurants/search`, {
      params: params,
    });
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get geolocation(): string {
    return this._geolocation;
  }

  set geolocation(value: string) {
    this._geolocation = value;
  }

  get sortType(): string {
    return this._sortType;
  }

  set sortType(value: string) {
    this._sortType = value;
  }

  get sortValue(): string {
    return this._sortValue;
  }

  set sortValue(value: string) {
    this._sortValue = value;
  }

  get stars(): number {
    return this._stars;
  }

  set stars(value: number) {
    this._stars = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  public get url(): string {
    return this.baseUrl;
  }
}
