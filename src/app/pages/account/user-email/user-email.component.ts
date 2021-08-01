import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.css'],
})
export class UserEmailComponent implements OnInit {
  @Input() user: User | undefined;
  emailIcon = faEnvelope;

  constructor() {}

  ngOnInit(): void {}
}
