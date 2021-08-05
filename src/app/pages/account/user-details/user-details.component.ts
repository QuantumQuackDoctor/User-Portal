import { Component, Input, OnInit } from '@angular/core';
import { faIdCard, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User | undefined;

  nameIcon = faIdCard;
  dateIcon = faCalendar;
  phoneIcon = faPhone;

  constructor() {}

  ngOnInit(): void {}
}
