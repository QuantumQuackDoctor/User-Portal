
import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { AccountComponent } from './pages/account/account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginErrorInterceptor } from './interceptors/LoginErrorInterceptor';
import { JwtInterceptor } from './interceptors/JwtInterceptor';
import { CartComponent } from './pages/cart/cart.component';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantItemComponent } from './pages/restaurant/restaurant-item/restaurant-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginFormComponent } from './pages/login/login-form/login-form.component';
import { RegisterFormComponent } from './pages/login/register-form/register-form.component';
import { UserDetailsComponent } from './pages/account/user-details/user-details.component';
import { UserSettingsComponent } from './pages/account/user-settings/user-settings.component';
import { DeleteAccountDialogComponent } from './pages/account/delete-account-dialog/delete-account-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { OrdersComponent } from './pages/account/orders/orders.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CartDropdownComponent } from './shared/cart-dropdown/cart-dropdown.component';
import {RouterModule} from "@angular/router";
import {UserErrorHandlerService} from "./services/user-error-handler.service";
import { RestaurantDisplayComponent } from './pages/search/restaurant-display/restaurant-display.component';
import { StarComponent } from './shared/star/star.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CreateTokenComponent } from './pages/cart/create-token/create-token.component';
import { RecentOrdersComponent } from './pages/account/recent-orders/recent-orders.component';
import { RecentOrderComponent } from './pages/account/recent-orders/recent-order/recent-order.component';
import { NgxPaginationModule } from "ngx-pagination";
import { SingleOrderComponent } from './pages/account/orders/single-order/single-order.component';
import { OrderFilterPipe } from './pipes/order-filter.pipe';
import { ForgotPasswordComponent } from './pages/login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/login/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    AccountComponent,
    CartComponent,
    CartItemComponent,
    RestaurantComponent,
    RestaurantItemComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserDetailsComponent,
    UserSettingsComponent,
    DeleteAccountDialogComponent,
    OrdersComponent,
    ActivateAccountComponent,
    CartDropdownComponent,
    RestaurantDisplayComponent,
    StarComponent,
    CreateTokenComponent,
    RecentOrdersComponent,
    RecentOrderComponent,
    SingleOrderComponent,
    OrderFilterPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    NoopAnimationsModule,
    MatSelectModule,
    RouterModule,
    NgxStripeModule.forRoot('pk_test_51JUCrpATHQZZA29u2Z9T83a5jPQIPVHCa0wooyuyiaj561uWh4iNt9ZhocS0nSPWTft9rCbksrjq3Dk8pqKSLad100ZrRTjE9z'),
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: UserErrorHandlerService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
