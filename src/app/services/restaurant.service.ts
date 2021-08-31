import { Injectable } from '@angular/core';
import { Item } from '../models/item/item';
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor() {}

  getRestaurant(id): Restaurant {
    return {
      id: 0,
      name: 'Restaurant',
      search: 'restaurant',
      averageTime: 10,
      averageRating: 3,
      priceRating: 4,
      address: '3017 Harrison Blvd, Ogden, UT 84403',
      menu: [
        new Item(
          1,
          'Big Mac',
          5.3,
          'Sample description 1',
          1,
          'https://s.yimg.com/ny/api/res/1.2/9nfLT8nhPkXbWNtXYsdMVA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTY0MA--/https://s.yimg.com/uu/api/res/1.2/1ObWdUc408dH9pEqlHDz9w--~B/aD00MDA7dz00MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/en/cnwgroup.com/de8c4e116bbb6c1266676bd2c967bb28',
          []
        ),
        new Item(
          2,
          '20 Pc McNuggets',
          5.78,
          'Sample description 2',
          1,
          'https://www.mcdonalds.com/content/dam/ca/nfl/web/nutrition/products/tile/en/mcdonalds-20-chicken-mcnuggets.jpg',
          []
        ),
      ],
      hours: {
        MON: '11:00am - 11:00pm',
        TUE: '11:00am - 11:00pm',
        WED: '11:00am - 11:00pm',
        THU: '11:00am - 11:00pm',
        FRI: '11:00am - 11:00pm',
        SAT: '11:00am - 11:00pm',
        SUN: '11:00am - 11:00pm',
      },
      ratings: [
        {
          username: 'username',
          imageURL: '',
          stars: 4,
          description:
            'Deserunt qui qui voluptate quis pariatur enim pariatur cillum consectetur. Enim cillum in velit amet mollit laboris. Mollit sunt consectetur non qui consectetur ipsum pariatur do voluptate non qui commodo ad. Nisi nostrud proident ex aute cupidatat et velit eiusmod.',
        },
        {
          username: 'username2',
          imageURL:
            'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
          stars: 2,
          description:
            'Deserunt qui qui voluptate quis pariatur enim pariatur cillum consectetur. Enim cillum in velit amet mollit laboris. Mollit sunt consectetur non qui consectetur ipsum pariatur do voluptate non qui commodo ad. Nisi nostrud proident ex aute cupidatat et velit eiusmod.',
        },
      ],
    };
  }
}
