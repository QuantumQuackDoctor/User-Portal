import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; //attach to auth service
  faUser = faUser;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //check authentication status and set boolean
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
