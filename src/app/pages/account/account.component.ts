import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user?: User;

  constructor(userService: UserService) {
    userService.getUserDetails().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {}

  public scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
