import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  loading = true;
  activated = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authService.activateAccount(params['token']).subscribe(
        () => {
          this.loading = false;
          this.activated = true;
        },
        (err: HttpErrorResponse) => {
          this.loading = false;
          this.activated = false;
          switch (err.status) {
            case 410:
              this.errorMessage =
                'activation expired, a new email has been sent';
              break;
            case 404:
              this.errorMessage = 'account not found';
              break;
            default:
              this.errorMessage = 'server error';
          }
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
