import { Component, Input, OnInit } from '@angular/core';
import {
  faIdCard,
  faCalendar,
  faEnvelope,
} from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['../account.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user: User = {
    email: '',
    firstName: '',
    settings: { notifications: { text: false, email: false }, theme: 'light' },
  };
  inputsDisabled: boolean = true;
  faPen = faPen;

  nameIcon = faIdCard;
  dateIcon = faCalendar;
  phoneIcon = faPhone;
  emailIcon = faEnvelope;

  constructor() {}

  ngOnInit(): void {}
}
