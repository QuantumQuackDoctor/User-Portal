import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input() stars: number = 0;
  starIcon = faStar;

  constructor() {}

  ngOnInit(): void {}

  createRange(length: number): Array<number> {
    return new Array(length);
  }
}
