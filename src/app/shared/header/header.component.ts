import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; //attach to auth service
  faUser = faUser;

  constructor() {}

  ngOnInit(): void {
    //check authentication status and set boolean
  }
}
